import connectMongo from "@/lib/db";
import Customer from "@/models/Customer";
import Affiliate from '@/models/Affiliate'

export async function GET(req) {

  return Response.json({ message: "Register Customer Route!", }, { status: 200 })
  
}

//Register Customer:
export async function POST(req) {

  await connectMongo();
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  // console.log("data",data)


  const cookieHeader = req.headers.get('cookie') || ''
  const refMatch = cookieHeader.match(/ref=([^;]+)/)
  const refCode = refMatch ? refMatch[1] : null

  let referredBy = null

  let affiliate;
  if (refCode) {
    console.log("Ref Code",refCode )
    affiliate = await Affiliate.findOne({ affiliateCode: refCode })
    if (affiliate) {
      console.log("Affiliate found!")
      referredBy = affiliate._id

      
      
      

    }
  }

  // return Response.json({ message: "success!", status: 201 }, { status: 201 })

  const newDataWithAffiliate = [{...data, referredBy}]


  try {
    const newCustomer = await Customer.create(newDataWithAffiliate)
    
    if (affiliate) {
      console.log("Affiliate found!")
      referredBy = affiliate._id

      if(affiliate.referredCustomers){
        affiliate.referredCustomers.push({ userId: newCustomer._id })
      }else {
        affiliate.referredCustomers = [{ userId: newCustomer._id }]
      }
      await affiliate.save()     
      
      

    }

    



    return Response.json({ message: "success!", customer:newCustomer,status: 201 }, { status: 201 })
  } catch (error) {
    return Response.json({ message: "Something went wrong!", error }, { status: 500 })
  }



}
