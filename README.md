# Next.js / MongoDB Atlas  
  
YouTube:  
[How to use mongodb database in nextjs](https://www.youtube.com/watch?v=l5dMurZaNJQ)  
HarmonyCodes  
16m:20s  
  
$ npx create-next-app@latest .  
Ok to proceed? (y) y  
use defaults? No, customize settings  
use TypeScript? No  
linter? None  
React Compiler? No  
Tailwind? No  
src/ directory? No  
App Router? Yes  
customize import alias? No  
include AGENTS.md? No  
  
$ npm run dev  
cmd+click http://localhost:****  
  
$ npm i mongoose    
  
in the root directory, create .env file:  
MONGODB_URI = "mongodb+srv://danielalvarez:<db_password>@cluster0.4bkm3yq.mongodb.net/?appName=Cluster0"  
change <db_password> to actual password  
MONGODB_NAME = "testing-nextjs"  
  
in root dir, create /lib folder    
create file: lib/mongodb.js  
  
```  
import mongoose from 'mongoose'  
const mongodbUri = process.env.MONGODB_URI  
const mongodbName = process.env.MONGODB_NAME  
export default async function connectDB(){  
  try{  
    mongoose.connect(mongodbUri, {dbName:mongodbName})  
    console.log('MongoDB Connected')  
  }catch(err){  
    console.log(err)  
  }  
}  
```
  
in root dir, create file instrumentation.js  
  
```  
import connectDB from './lib/mongodb.js'  
export function register(){  
    connectDB()  
}  
```

update the next.config.mjs file  
below  
/* config options here */  
experimental:{ }  
make sure to add a blank space between the 2 curly braces  
  
$ ctrl+c  
$ clear  
$ npm run dev  
  
in root dir, create /models folder  
create file /models/product.js  
```  
import {model,models,Schema} from 'mongoose'  
const ProductSchema = new Schema({  
  name:{  
    type:String,  
    required:true  
  },  
  price:{  
    type:Number,  
    required:true  
  }  
})  
export const Product = models.Product || model("Product",ProductSchema)  
```  
inside the app directory, create a file /api/product/route.js  
```  
import {NextRequest,NextResponse} from 'next/server'  
import {Product} from '@/models/product.js'  
export async function GET(){  
  try{  
      const fetchProducts = await Product.find()  
      return NextResponse.json({data:fetchProducts})  
      }catch(err){  
        console.log(err)  
      }  
}  
export async function POST(req){  
  try{  
    const {name,price} = await req.json()  
    if(!name || !price) return NextResponse.json({status:404,message:"Name or Price not set"})  
    const addProduct = new Product({  
        name,  
        price  
    })  
    await addProduct.save()  
    return NextResponse.json({status:200,message:"Product Added"})  
  }catch(err){  
    console.log(err)  
  }  
}  
```  
VS Code Extension: Thunder Client  
click New Request  
change GET to POST  
change URL to http://localhost:****/api/product  
Body > JSON  
```
{  
    "name":"Orange",  
    "price":"400"  
}  
```
click Send  
  
check MongoDB Atlas to confirm  
```
{  
    "name":"Mango",  
    "price":"300"  
}  
```
click Send  
check MongoDB Atlas to confirm  
  
change POST to GET  
click Send  
should return 2 db entries  
  