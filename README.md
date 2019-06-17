# Search Guru

Search Guru is a platform which scrapes information from different IIT's websites and various department/ branches and shows collectively various professors information such as their background, contact, address, experience, scholarly publications, skills and accomplishments, researcher identity, etc. on a single webpage. Currently people working on it are:

[Aashish Kumar](https://www.facebook.com/akumar118)

[Vishal Anand](https://www.facebook.com/vishal.nnd1)


## Getting Started

Install ElasticSearch, follow tutorial on [Install](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started-install.html).
Enable CORS in elasticsearch, add following lines in ES_INSTALL_DIR/config/elasticsearch.yml
```yml
http.cors.enabled : true
 
http.cors.allow-origin : "*"
http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length
```
Install the Node Package Manager 
```bash
$ sudo snap install node --classic --channel=10
$ npm install nodemon -g
```

Fork this repo and clone it
```bash
$ git clone https://github.com/<Your User Name>/search_guru.git
```

Run this commmand in both the folders search_guru and client to install the dependencies
```bash
$ npm install
```

Run the application
```bash
# In the search_guru folder
$ nodemon

# Inside the client folder
$ npm start
```

The web app runs at port 4200 i.e. http://localhost:4200/ and the Mongoose db at port 3000