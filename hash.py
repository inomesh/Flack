import bcrypt
import re

def hash(newhash):
    encode = str(newhash).encode('utf-8')
    hashed = bcrypt.hashpw(encode, bcrypt.gensalt())
    return hashed


def checkpas(pasword,storedhash):
    mypass = str(pasword).encode('utf-8')   #done little hack here, because in csv all the hashes are sttored
    strhash = re.split("'",storedhash)[1]   #as a string not in bytes(encoded) so i split it and then merge it and then encode it
                                            # to get the result.
    encoded = strhash.encode('utf-8')
    if bcrypt.checkpw(mypass, encoded):
        return True
    else:
        return False


























# fields = ['firstName','lastName','userName','password']

# firstName   =   str(input())   
# lastName    =   str(input())
# userName    =   str(input())
# # # password
# passwordobj = Password(str(input()))

# mydict = [
#     firstName,
#     lastName ,
#     userName ,
#     passwordobj.hash()
# ]


# with open('one.csv','a') as csv_file:
#     csv_writer = csv.writer(csv_file,lineterminator='\n', delimiter=',')

#     # csv_writer.writeheader()

#     csv_writer.writerow(mydict)