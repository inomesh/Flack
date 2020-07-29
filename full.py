import csv
import bcrypt
import re
from hash import *
from RegEx import *

# datalist should contain this pattern sequence in it:-
# firstName, lastName, userName, password


# ----------------------------------------------------------------------------------------------------------------------
# function for checking wether the coming userName already exists in csv or not.


def checkcsvbeforeappend(mycsv,datalist):

    with open(mycsv, 'r') as read_csv:
        next(read_csv)
        csv_reader = csv.reader(read_csv,lineterminator='\n', delimiter=',')

        for i in csv_reader:
            if datalist[2] in i:
                return True

# ------------------------------------------------------------------------------------------------------------------------
# function for appending the data into csv after running the "ckeckcsv function"


def appendcsv(mycsv,datalist):

    #checking if the userName already exists or not:
        if checkcsvbeforeappend(mycsv,datalist) == True:
            return False

        else:
            
                #checking for spaces and tabs in pasword
                spacefree_pas = spaces(datalist[3])
                
                # now checking for password regex pattern
                if pas(spacefree_pas) == True:
                    
                    # datalist should contain this pattern sequence in it:-
                    # firstName, lastName, userName, password

                    #assigning values
                    firstName = datalist[0]
                    lastName  = datalist[1]
                    userName  = datalist[2]

                    #encrypting password
                    password  = hash(datalist[3])
                    mydict    = [ firstName, lastName, userName , password]

                    # appending values in csv file
                    with open(mycsv,'a') as csv_file:

                        csv_writer = csv.writer(csv_file,lineterminator='\n', delimiter=',')

                        # csv_writer.writeheader()

                        csv_writer.writerow(mydict)
                        
                    return True
                
                else:
                    return False



#--------------------------------------------------------------------------------------------------------------------------

# print(appendcsv('one.csv',['chahat','bahl','imchahat','chahat@1234']))


#--------------------------------------------------------------------------------------------------------------------------
# function for checking Login_input and password and comparing it with our csv
#   datalist should follow the pattern [username, password]

def logincheck(mycsv,datalist):
    username = str(datalist[0])
    password = str(datalist[1])
    with open(mycsv,'r') as read_csv:
        
        csv_reader = csv.reader(read_csv,lineterminator='\n', delimiter=',')

        for i in csv_reader:
            if username in i and checkpas(password,i[3]) == True:
                return True

            # if username not in i:
            #     return False
           
print(logincheck('one.csv',['immayank','mayank@123#']))
# print(logincheck('one.csv',['immadhuri','immadhuri123']))




