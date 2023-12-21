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
        let contentDir=Guid.NewGuid().ToString("N")
        for m in httpRegex.Matches content do //匹配并遍历所有的图片链接
            let url = m.Value
            printfn "file: %s \n image: %s" file url
            try
            url
                |> fun url-> 
                    if url.StartsWith("https://") && url.Contains("chundot") then
                        url.Replace("https://", "http://")
                    else url
                |> http.GetByteArrayAsync
                |> Async.AwaitTask
                |> Async.RunSynchronously
                |> fun bytes->
                    let mutable urlFileName = Path.GetFileName url
                    let fileDir = Path.GetDirectoryName file
                    //let fileName = Path.GetFileNameWithoutExtension file 
                    //let fileName = Regex.Replace(fileName, @"^\d+\.", "")//移除序号
                    let assetsDir = Path.Combine(fileDir, "assets",contentDir)
                    if assetsDir |> Directory.Exists |> not then assetsDir |> Directory.CreateDirectory |> ignore
                    if Regex.IsMatch(urlFileName,@"^[A-Za-z0-9\.-]+$") |> not then
                        printfn "urlFileName: %s" urlFileName
                        //System.Console.ReadLine()|>ignore
                        urlFileName <- Guid.NewGuid().ToString("N") + Path.GetExtension(urlFileName)
                    urlFileName<-urlFileName.Replace(" ","-").Replace("%","-")
                    let filePath = Path.Combine(assetsDir, urlFileName)
                    printfn "filePath: %s" filePath
                    File.WriteAllBytes(filePath, bytes)
                    let newUrl = "./"+Path.GetRelativePath(fileDir,filePath).Replace("\\","/")
                    printfn "newUrl: %s" newUrl
                    s.Replace(url, newUrl) |> ignore
            with e-> printfn "error: %s" e.Message
        File.WriteAllText(file, s.ToString()) //写入文件
)