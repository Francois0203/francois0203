# Save this script as `start-project.ps1`

# Start Backend
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "cd .\backend\; cls; yarn start"

# Start Frontend
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "cd .\website\; cls; yarn start"