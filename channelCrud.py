import csv
import os 


# names = [ '#friendsForever', { 

#     "NoOfUsers": 100,
#     "description": "just for practice"
#  }   

#  ]

# fields = ['channelName','details']

# function for checking wether a channel exist or not
def readchannelCsv(mycsv,name):

    # with open("channels.csv",'r') as read_csv:
    with open(mycsv,'r') as read_csv:

            csv_reader = csv.reader(read_csv,lineterminator='\n', delimiter=',')
            next(csv_reader)
            for i in csv_reader:
                if i[0] == name:
                    # obj = eval(j)
                    # return i
                    return True
                # obj = eval(j)
                # print(type(obj) is object)


# function for appending channel into csv
def appendChannelCsv(mycsv, datalist):
    # datalist must follow this pattern
    # [ ChannelName, { NoOfUsers: 00, description: abc} ]

    # with open("channels.csv",'a') as csv_file:
    with open(mycsv,'a') as csv_file:

        csv_writer = csv.writer(csv_file,lineterminator='\n', delimiter=',')

        # csv_writer.writerow(fields)
        # csv_writer.writerow(names)
        if not readchannelCsv('channels.csv', datalist[0]):
                csv_writer.writerow(datalist)
                return True
        return 'already exists'
          

# function for deleting entire channel
def deleteChannel(mycsv, ChannelName):

    with open(mycsv,'r+') as read:

            csv_read = csv.reader(read,lineterminator='\n', delimiter=',')

            with open('channels2.csv','w') as writecsv:
                write =  csv.writer(writecsv,lineterminator='\n', delimiter=',')

                for i in csv_read:
                    if i[0] != ChannelName:
                        write.writerow(i)

            # don't touch spaces it'll break the program because of identation

    # Removing existing file 
        
    location = r'C:\Users\nomesh\Desktop\New folder\Javascript\channels.csv'  
    
    os.remove(location)

    #renaming the newFile as Previous one

    PreFilePath = 'channels2.csv'
    NewFileName = 'channels.csv'
    os.rename(PreFilePath,NewFileName)
    print('successful')


# function for updating the Channel Usercount  
def updateChannelUsers(mycsv,channelName,number):

    # check if the requested channel exists or not
    if readchannelCsv(mycsv, channelName):
        
            with open(mycsv,'r') as read:

                csv_reader = csv.reader(read,lineterminator='\n', delimiter=',')

                # for i,j in csv_reader:
                
                with open('channels2.csv','w') as writecsv:
                        write =  csv.writer(writecsv,lineterminator='\n', delimiter=',')

                        for i in csv_reader:
                            if i[0] == channelName: 
                                dic = eval(i[1])
                                prenum = int(dic["NoOfUsers"])
                                arr = [ i[0], { "NoOfUsers":number + prenum , "description": dic["description"] } ]
                                write.writerow(arr)

                            if i[0] != channelName:                       
                                write.writerow(i)

    # don't touch spaces it'll break the program because of identation

    # Removing existing file 

            location = r'C:\Users\nomesh\Desktop\New folder\Javascript\channels.csv'  

            os.remove(location)

            #renaming the newFile as Previous one

            PreFilePath = 'channels2.csv'
            NewFileName = 'channels.csv'
            os.rename(PreFilePath,NewFileName)


# channelList joined by the user
def channelList():
    mylist = []

    with open('channels.csv','r') as read:
        read_csv  = csv.reader(read,lineterminator='\n', delimiter=',')
        next(read_csv)
        for i,j in read_csv:
            mylist.append(i)
        
    return mylist




# print(updateChannelUsers('channels.csv','#familydrama',40))
# print(deleteChannel('channels.csv','#batmanforever'))
# print(readchannelCsv('channels.csv','#praesentium'))
# print(appendChannelCsv('channels.csv',['#batmanforever',{ 'NoOfUsers':25,'description':'how are you boys'} ]))


