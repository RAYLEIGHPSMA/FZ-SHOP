Param(
  [string]$RepoUrl
)
if (-not $RepoUrl) {
  Write-Host "Usage: .\publish-setup.ps1 -RepoUrl https://rayleighpsma.github.io/FZ-BRAND/
  exit 1
}

git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin $RepoUrl
git push -u origin main

Write-Host "Repository pushed. GitHub Actions workflow will build and deploy to gh-pages branch automatically on push to main."