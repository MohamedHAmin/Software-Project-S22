
const mongoose =require('mongoose')
const validator =require('validator')

const commentSchema = new mongoose.Schema({
  
    commenton:{
     type: mongoose.Schema.Types.ObjectId,
     required:true
    },
    Text:{
      type:Text,
      tirm:true,
      required:true
  },
  hashtags:{
      type:Array,
  },
  tags:{
      type:Text,
      tirm:true
  },
  
  liks:[{like:{
      react:{
          type:Text
      },
      userId:{
        type: mongoose.Schema.Types.ObjectId,
      },name:{
          type:String
      }
  }},{
    timestamps:true,
    toJSON: {virtuals: true}
  }],
  comments:[{comment:{
    Text:{
        type:Text,
        tirm:true,
        required:true
    },
    hashtags:{
        type:Array,
    },
    tags:{
        type:Text,
        tirm:true
    },
    
    liks:[{like:{
        react:{
            type:Text
        },
        userId:{
          type: mongoose.Schema.Types.ObjectId,
        },name:{
            type:String
        }
    }},{
      timestamps:true,
      toJSON: {virtuals: true}
    }],
}}],
},{
  timestamps:true,
  toJSON: {virtuals: true}
  
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment