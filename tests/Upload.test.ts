import {test} from "@playwright/test"

test.use({
    browserName: "firefox"
})
test("Upload Files", async ({page}) => {
    await page.goto("https://blueimp.github.io/jQuery-File-Upload/");

    //type= 'file' & Multiple - denotes able to upload more than one file
    await page.setInputFiles("input[type='file']", ["tests/UploadFiles/Dog1.jpg", 
        "tests/UploadFiles/Dog2.jpg"
    ])

     await page.waitForLoadState();
    
    // Page.pause();
    

    const [uploadFiles] = await Promise.all([
        page.waitForEvent("filechooser"),
        page.click("input[type='file']")
    ])
   
    if(uploadFiles.isMultiple()){
        uploadFiles.setFiles(["tests/UploadFiles/Dog1.jpg", 
        "tests/UploadFiles/Dog2.jpg"])
    }
    else{
        uploadFiles.setFiles(["tests/UploadFiles/Dog1.jpg"])
    }
        

    await page.waitForTimeout(2000)



})