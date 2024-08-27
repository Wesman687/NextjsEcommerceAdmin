/*
import { NextResponse } from "next/server";
import { isAdminRequest} from '../../actions'
import cloudinary from 'cloudinary'
import { writeFile } from "fs/promises";
import fs from 'fs'
import path from "path";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})
export const config = {
    api: {
      bodyParser: false,
    },
  }

export const POST = async (req, res) => {
  const adminRequest = await isAdminRequest()
  if (!adminRequest) {
    throw 'not an admin'
  }

    const formData = await req.formData();
    const file = formData.get('file');
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + file.name.replaceAll(" ", "_");
      console.log(filename);

      await writeFile(
        path.join(process.cwd(), "public/uploads/" + filename),
        buffer
      );
    const filePath = `publics/uploads/${filename}`
  
    const { secure_url } = await cloudinary.uploader.upload(filePath);
    console.log(secure_url, 'before sync')
    fs.unlinkSync(filePath);
    console.log('finished?', secure_url)
    return NextResponse.json({ secure_url });

    // const form = formidable({ uploadDir: './' });
    // await form.parse(req, (err, fields, files) => {
    //     console.log(files,files.image, files.image.path)
    //   cloudinary.v2.uploader.upload(files.image.path, function(error, result) {
    //     console.log(result, result.secure_url)
    //     res.status(200).json({
    //       success: true,
    //       data: result.secure_url
    //     })
    //   });
    // });

//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename = Date.now() + file.name.replaceAll(" ", "_");


//     await writeFile(
//       path.join(process.cwd(), "public/uploads/" + filename),
//       buffer
//     );
//     console.log("uploaded?");
//     return NextResponse.json({ Message: "Success", status: 201 });
//   } catch (error) {
//     console.log("Error occured ", error);
//     return NextResponse.json({ Message: "Failed", status: 500 });
//   }
  return NextResponse.json({ Message: "Failed", status: 500 });
};*/
