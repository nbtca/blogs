open System.Text.RegularExpressions
open System
open System.IO
open System.Linq
open System.Text
let baseDir = Path.GetFullPath("../../docs")
printfn "baseDir: %s" baseDir
//匹配所有图片链接的正则表达式
let httpRegex = Regex @"https?://[^\s\)]+?(\.png|\.gif|.jpe?g)"
using (new System.Net.Http.HttpClient()) (fun http->
    //遍历所有的md文件
    for file in Directory.GetFiles(baseDir, "*.md", SearchOption.AllDirectories) do
        let content = File.ReadAllText file //读取文件内容
        let s = StringBuilder content //创建StringBuilder对象
        for m in httpRegex.Matches content do //匹配并遍历所有的图片链接
            let url = m.Value
            if true then
            //if url.Contains "oss.chundot.xyz" then
                printfn "file: %s \n image: %s" file url
                url//.Replace("https://", "http://")
                    |> http.GetByteArrayAsync
                    |> Async.AwaitTask
                    |> Async.RunSynchronously
                    |> fun bytes->
                        let urlFileName = Path.GetFileName url
                        let fileDir = Path.GetDirectoryName file
                        let fileName = Path.GetFileNameWithoutExtension file 
                        let fileName = Regex.Replace(fileName, @"^\d+\.", "")//移除序号
                        let assetsDir = Path.Combine(fileDir, fileName+".assets")
                        if assetsDir |> Directory.Exists |> not then assetsDir |> Directory.CreateDirectory |> ignore
                        let filePath = Path.Combine(assetsDir, urlFileName)
                        printfn "filePath: %s" filePath
                        File.WriteAllBytes(filePath, bytes)
                        let newUrl = "./"+Path.GetRelativePath(fileDir,filePath).Replace("\\","/")
                        printfn "newUrl: %s" newUrl
                        s.Replace(url, newUrl) |> ignore
        File.WriteAllText(file, s.ToString()) //写入文件
)







