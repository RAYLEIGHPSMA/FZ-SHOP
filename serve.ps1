$port = 8000
$prefix = "http://localhost:$port/"
$folder = Split-Path -Parent $MyInvocation.MyCommand.Definition
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Output "Serving $folder on $prefix"
while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    $localPath = $request.Url.AbsolutePath.TrimStart('/').Replace('/', '\')
    if ([string]::IsNullOrEmpty($localPath)) { $localPath = 'index.html' }
    $filePath = Join-Path $folder $localPath
    if (Test-Path $filePath) {
        try {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = switch ([System.IO.Path]::GetExtension($filePath).ToLower()) {
                '.html' { 'text/html' }
                '.css' { 'text/css' }
                '.js' { 'application/javascript' }
                '.jpg' { 'image/jpeg' }
                '.jpeg' { 'image/jpeg' }
                '.png' { 'image/png' }
                '.svg' { 'image/svg+xml' }
                default { 'application/octet-stream' }
            }
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes,0,$bytes.Length)
        } catch {
            $response.StatusCode = 500
            $errorMsg = [System.Text.Encoding]::UTF8.GetBytes("Internal Server Error")
            $response.OutputStream.Write($errorMsg,0,$errorMsg.Length)
        }
    } else {
        $response.StatusCode = 404
        $notFound = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
        $response.OutputStream.Write($notFound,0,$notFound.Length)
    }
    $response.OutputStream.Close()
}
$listener.Stop()
$listener.Close()
