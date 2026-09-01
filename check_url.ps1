$urls = @(
    "https://sankph-maker.github.io/priya-nursery/",
    "https://sankph-maker.github.io/priya-nursery/assets/nursery_tour.mp4",
    "https://sankph-maker.github.io/priya-nursery/assets/real_nursery_1.jpg",
    "https://sankph-maker.github.io/priya-nursery/assets/logo.jpg"
)

foreach ($url in $urls) {
    try {
        $req = [System.Net.HttpWebRequest]::Create($url)
        $req.Method = "HEAD"
        $req.UserAgent = "Mozilla/5.0"
        $resp = $req.GetResponse()
        Write-Host "$url : SUCCESS ($($resp.StatusCode))"
        $resp.Close()
    } catch {
        Write-Host "$url : FAILED ($($_.Exception.Message))"
    }
}
