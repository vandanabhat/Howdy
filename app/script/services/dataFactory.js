angular.module('howdy').factory('dataFactoryService', function(){
    var dataFactoryService = function(){};
    dataFactoryService.prototype.howdychats = [
        {
            name:'Arya Stark',
            chats: [{name:"Arya Stark", text:"hi"}],
            displayPic:'../app/images/arya-stark.jpg'
        },
        {   name:'John Snow',
            chats: [{name:"Arya Stark", text:"hi"}],
            displayPic:'../app/images/john-snow.jpg'
        },
        {   name:'Daenerys Targaryen',
             chats: [{name:"Arya Stark", text:"hi"}],
           displayPic:'../app/images/daenerys-targaryen.jpg'
        },
        {   name:'Jaime Lannister',
             chats: [{name:"Arya Stark", text:"hi"}],
           displayPic:'../app/images/jaime-lannister.jpg'
        },
        {   name:'Iron Thrown',
            type:'group',
            chats: [{name:"Arya Stark", text:"hi"}],
           displayPic:''
        },
        {   name:'Tyrion Lannister',
             chats: [{name:"Arya Stark", text:"hi"}],
           displayPic:'../app/images/tyrion_annister.jpg'
        },
        {   name:'Cersei Lannister',
             chats: [{name:"Arya Stark", text:"hi"}],
           displayPic:'../app/images/cersei_lannister.jpg'
        },
        {   name:'Grand Maester Pycelle',
             chats: [{name:"Arya Stark", text:"hi"}],
           displayPic:'../app/images/grand_maester_pycelle.jpg'
        },
        {   name:'We are Stark',
            type:'group',
            chats: [{name:"Arya Stark", text:"hi"}],
            displayPic:''
        },
        {   name:'Littlefinger',
             chats: [{name:"Arya Stark", text:"hi"}],
            displayPic:'../app/images/littlefinger.jpg'
        },
        {   name:'Ramsay Bolton',
             chats: [{name:"Arya Stark", text:"hi"}],
           displayPic:'../app/images/ramsay_bolton.jpg'
        },
        {   name:'Rickon Stark',
             chats: [{name:"Arya Stark", text:"hi"}],
           displayPic:'../app/images/rickon_stark.jpg'
        },
        {   name:'High Sparrow',
             chats: [{name:"Arya Stark", text:"hi"}],
           displayPic:'../app/images/high_sparrow.jpg'
        },
        {   name:'Eddard Ned Stark',
             chats: [{name:"Arya Stark", text:"hi"}],
           displayPic:'../app/images/eddard_ned_stark.jpg'
        },
        {   name:'Robb Stark',
             chats: [{name:"Arya Stark", text:"hi"}],
           displayPic:'../app/images/robb_stark.jpg'
        },
        {   name:'Catelyn Stark',
            chats: [{name:"Arya Stark", text:"hi"}],
           displayPic:'../app/images/catelyn_stark.png'
        }

    ];

    return dataFactoryService;
});
angular.module('howdy').factory('dataFactory', ['dataFactoryService', function(dataFactoryService){
    return new dataFactoryService;
}]);