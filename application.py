from os import truncate
import os
import requests
import re
import bcrypt
from hash import *              #
from RegEx import *             # Custom made
from full import *              #
from channelCrud import *       #
from flask import Flask, jsonify, render_template, request, url_for, redirect, session
from flask_socketio import SocketIO, emit
from datetime import timedelta

app = Flask(__name__)
# app.config['SECRET_KEY'] = 'lucifer123'
app.config['SECRET_KEY'] = os.environ['flaskAppPassword']
app.permanent_session_lifetime = timedelta(days=5)
socketio = SocketIO(app)

#----------------------------------------------------------------------------------------------------------------------    

# Homepage route
@app.route("/")
def index():
    return render_template('homepage.html')


#----------------------------------------------------------------------------------------------------------------------    

#Sign up
@app.route("/signup")
def signup():

    if request.method == 'GET': 
        return render_template('create_user.html')


#----------------------------------------------------------------------------------------------------------------------    

#login
@app.route('/login', methods=['GET','POST'])
def login():

    if request.method == 'GET':
        if 'username' and 'password' in session:
            return redirect(url_for('chat'))
        else:
            return render_template('login.html')

    if request.method == 'POST':

        firstName = request.form.get('fname')
        lastName  = request.form.get('lname')
        username  = request.form.get('create_username')
        password  = request.form.get('create_password') 

        arr = [firstName,lastName,username,password]
        
        if appendcsv(os.getcwd() + '/one.csv',arr) == True:
            return render_template('login.html')
        else:
            return render_template('create_user.html',message='false')


#----------------------------------------------------------------------------------------------------------------------    


#chat route
@app.route('/chat', methods=['GET','POST'])
def chat():
    
    if request.method == 'GET':
        if 'username' and 'password' in session:
             return render_template('chat2.html', username = session['username'],data = channelList())
        else:
            return redirect(url_for('login'))


    if request.method == 'POST':
        session.permanent = True
        username = request.form.get('login_username')
        password = request.form.get('login_password')
        
 #datalist should follow the pattern [username, password]
        datalist = [username, password]
        if logincheck(os.getcwd() + '/one.csv',datalist):
                session['username'] = str(username)
                session['password'] = str(password)
                return render_template('chat2.html',username = session['username'], data = channelList())     # channelList() function returns the array containing all the data of channels.csv
        else:
            return render_template('login.html',message='false')
 
#----------------------------------------------------------------------------------------------------------------------    


#socket routes

# route for chatMessages transfering.
@socketio.on('chat request')
def chat(obj):
    mydata = obj['data']
    sessionUsername = obj['Username']
    channel =  obj['channel']
    emit('sending back', { 'data':mydata, 'Username':sessionUsername,'channel':channel}, broadcast = True)



# route for creating New channels and storing it into channels.csv
@socketio.on('new channel')
def appendChannel(obj):

    channelName = obj['channelName']
    description = obj['description']
    arr = [channelName, False]

    if  readchannelCsv(os.getcwd() + '/channels.csv','#'+ channelName) == True:
            emit('newChannel result', arr, broadcast = True)    #if true then, sending error message
    else:
        appendChannelCsv(os.getcwd() + '/channels.csv',['#'+ channelName,{ 'NoOfUsers':1,'description':description}])
        arr[1] = True
        emit('newChannel result', arr, broadcast = True)




#route for updating new user, joined an existing channel into the channels.csv
@socketio.on('update new user')
def updateNewUserToCsv(obj):
       
    # if obj['updation'] == True:
        # updating the channels.csv by adding a new user to an existing channel.
        if readchannelCsv(os.getcwd() + '/channels.csv',obj['channel']) == True:
            result = updateChannelUsers(os.getcwd() + '/channels.csv',obj['channel'],obj['userCount'])
            # emit('new user Updated',True, broadcast = True)
            # not emitting because here we only want to run a function, and didn't want to
            # apply another function on it. 




#----------------------------------------------------------------------------------------------------------------------    


# Logout route
@app.route('/logout')
def logout():
    session.pop('username',None)
    session.pop('password',None)
    
    return redirect(url_for('login'))


#----------------------------------------------------------------------------------------------------------------------    


# Channels route
@app.route('/allchannels')
def channel():

    obj = channelList()     #assgining the returned Channels_List array into a variable
                            # function returns the array containing all the data of channels.csv
    if 'username' in session:
        return render_template('channels.html', message=obj, userSession=True)
    else:
        return render_template('channels.html', message=obj, userSession=False)




#----------------------------------------------------------------------------------------------------------------------    



# website title image route
@app.route('/static/favicon.ico')
def favicon():
    redirect_to=url_for('static', filename='favicon-16x16.jpg') 


#videos on website
@app.route('/Videos/Slack_main.mp4')
def video():
    redirect_to=url_for('static', filename='Slack_main.mp4')

#----------------------------------------------------------------------------------------------------------------------    



if __name__ == '__main__':
    app.run()