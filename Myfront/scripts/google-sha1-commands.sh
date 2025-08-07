#!/bin/bash

echo "🔍 Google SHA-1 Fingerprint Commands"
echo "====================================="
echo ""

echo "📱 For Debug Keystore (Development):"
echo "keytool -keystore ~/.android/debug.keystore -list -v"
echo ""

echo "🏭 For Production Keystore (Release):"
echo "keytool -keystore path-to-your-release-keystore -list -v"
echo ""

echo "📋 Steps:"
echo "1. Run one of the commands above"
echo "2. Look for 'SHA1:' in the output"
echo "3. Copy the SHA1 value (e.g., AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD)"
echo "4. Remove colons and convert to lowercase (e.g., aabbccddeeff00112233445566778899aabbccdd)"
echo "5. Add to Google Cloud Console"
echo ""

echo "🔗 Google Cloud Console Setup:"
echo "1. Go to: https://console.cloud.google.com/"
echo "2. Navigate to your project"
echo "3. Go to APIs & Services > Credentials"
echo "4. Edit your OAuth 2.0 Client ID"
echo "5. Add Android configuration:"
echo "   - Package name: com.mykover.app"
echo "   - SHA-1 certificate fingerprint: (your SHA-1)"
echo ""

echo "📱 Package Name: com.mykover.app"
echo "🔗 Redirect URI: mykover://auth"
echo ""

# Try to run the debug command if Java is available
if command -v keytool &> /dev/null; then
    echo "🚀 Trying to get debug SHA-1 automatically..."
    echo "Command: keytool -keystore ~/.android/debug.keystore -list -v"
    echo ""
    
    if [ -f ~/.android/debug.keystore ]; then
        keytool -keystore ~/.android/debug.keystore -list -v 2>/dev/null | grep -i "SHA1:" | head -1
        echo ""
        echo "✅ Copy the SHA1 value above and remove colons"
    else
        echo "❌ Debug keystore not found at ~/.android/debug.keystore"
        echo "💡 This is normal for new development environments"
    fi
else
    echo "❌ keytool not found. Please install Java Development Kit (JDK)"
    echo "   Ubuntu/Debian: sudo apt-get install openjdk-11-jdk"
    echo "   macOS: brew install openjdk@11"
    echo "   Windows: Download from https://adoptium.net/"
fi 