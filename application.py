import requests
import re
import bcrypt
from hash import *      #
from RegEx import *     # Custom made
from full import *      #
from flask import Flask, jsonify, render_template, request, url_for, redirect, session
from flask_socketio import SocketIO, emit
from datetime import timedelta

app = Flask(__name__)
app.config['SECRET_KEY'] = 'lucifer123'
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
        
        if appendcsv('one.csv',arr) == True:
            print(arr)
            return render_template('login.html')
        else:
            print(appendcsv('one.csv',arr))
            return render_template('create_user.html',message='false')


#----------------------------------------------------------------------------------------------------------------------    


#chat route
@app.route('/chat', methods=['GET','POST'])
def chat():
    
    if request.method == 'GET':
        if 'username' and 'password' in session:
             return render_template('chat2.html', username = session['username'])
        else:
            return redirect(url_for('login'))


    if request.method == 'POST':
        session.permanent = True
        username = request.form.get('login_username')
        password = request.form.get('login_password')
        
#datalist should follow the pattern [username, password]
        datalist = [username, password]
        if logincheck('one.csv',datalist):
                session['username'] = str(username)
                session['password'] = str(password)
                return render_template('chat2.html',username = session['username'])
        else:
            return render_template('login.html',message='false')
 
#----------------------------------------------------------------------------------------------------------------------    


#socket route
@socketio.on('chat request')
def chat(obj):
    mydata = obj['data']
    sessionUsername = obj['Username']
    emit('sending back', { 'data':mydata, 'Username':sessionUsername}, broadcast = True)



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
    return render_template('channels.html')




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
