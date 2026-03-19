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
  