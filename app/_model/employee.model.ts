import {Schema, model, models} from "mongoose";
import hash from 'bcrypt';

const schema = new Schema({
    name:{
        type:String,
        require:[true, "tilte is missing"],
    },
    email:{
        type:String,
        require:[true, "Email is missing"],
        unique:[true, "already register email id"]
    },
    department:{
        type:String,
        require:[true, "department is missing"],
    },
    role:{
        type:String,
        enum: {
            values:["employee","manager"],
             message: "enum validator failed"
        },
        require:[true, "role is missing"],
    },
    password:{
        type:String,
        select:false,
    }
})

schema.pre('save',async function (next){
        if(!this.isModified('password')){
            next()
        }
      this.password = await hash.hash(this.password!, 10)
})

export default models?.employee || model('employee', schema);