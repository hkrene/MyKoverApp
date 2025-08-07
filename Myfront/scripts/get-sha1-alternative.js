#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Getting SHA-1 fingerprint for Google Authentication...\n');

// Function to check if Java is installed
function checkJava() {
  try {
    execSync('java -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Function to find keytool
function findKeytool() {
  const possiblePaths = [
    '/usr/bin/keytool',
    '/usr/local/bin/keytool',
    '/opt/java/bin/keytool',
    '/Library/Java/JavaVirtualMachines/*/Contents/Home/bin/keytool',
    'C:\\Program Files\\Java\\*\\bin\\keytool.exe',
    'C:\\Program Files (x86)\\Java\\*\\bin\\keytool.exe'
  ];

  for (const pattern of possiblePaths) {
    try {
      const files = fs.readdirSync(path.dirname(pattern));
      for (const file of files) {
        const fullPath = path.join(path.dirname(pattern), file);
        if (file.includes('keytool') && fs.existsSync(fullPath)) {
          return fullPath;
        }
      }
    } catch (error) {
      // Continue to next path
    }
  }
  return null;
}

// Function to get SHA-1 using Android SDK
function getSHA1FromAndroidSDK() {
  try {
    const androidHome = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
    if (androidHome) {
      const keytoolPath = path.join(androidHome, 'build-tools', '*', 'keytool');
      const keytool = findKeytool();
      if (keytool) {
        const command = `"${keytool}" -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android`;
        const output = execSync(command, { encoding: 'utf8' });
        
        const sha1Match = output.match(/SHA1:\s*([A-F0-9:]+)/i);
        if (sha1Match) {
          return sha1Match[1].replace(/:/g, '').toLowerCase();
        }
      }
    }
  } catch (error) {
    console.error('❌ Error using Android SDK keytool:', error.message);
  }
  return null;
}

// Function to generate debug keystore if it doesn't exist
function generateDebugKeystore() {
  try {
    const userHome = process.env.HOME || process.env.USERPROFILE;
    const androidDir = path.join(userHome, '.android');
    const debugKeystorePath = path.join(androidDir, 'debug.keystore');
    
    if (!fs.existsSync(debugKeystorePath)) {
      console.log('📱 Debug keystore not found, generating...');
      
      if (!fs.existsSync(androidDir)) {
        fs.mkdirSync(androidDir, { recursive: true });
      }
      
      const keytool = findKeytool();
      if (keytool) {
        const command = `"${keytool}" -genkey -v -keystore "${debugKeystorePath}" -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000 -storepass android -keypass android -dname "CN=Android Debug,O=Android,C=US"`;
        execSync(command, { stdio: 'ignore' });
        console.log('✅ Debug keystore generated');
        return true;
      }
    }
  } catch (error) {
    console.error('❌ Error generating debug keystore:', error.message);
  }
  return false;
}

// Main execution
console.log('🚀 Starting SHA-1 generation...\n');

// Check if Java is installed
if (!checkJava()) {
  console.log('❌ Java is not installed or not in PATH');
  console.log('\n📋 Please install Java Development Kit (JDK):');
  console.log('   - Ubuntu/Debian: sudo apt-get install openjdk-11-jdk');
  console.log('   - macOS: brew install openjdk@11');
  console.log('   - Windows: Download from https://adoptium.net/');
  console.log('\n🔧 After installing Java, run this script again');
  process.exit(1);
}

// Try to generate debug keystore if it doesn't exist
generateDebugKeystore();

// Try to get SHA-1
let sha1 = getSHA1FromAndroidSDK();

if (sha1) {
  console.log('\n📋 SHA-1 Fingerprint for Google Console:');
  console.log('='.repeat(50));
  console.log(sha1);
  console.log('='.repeat(50));
  
  console.log('\n📝 Instructions:');
  console.log('1. Go to Google Cloud Console: https://console.cloud.google.com/');
  console.log('2. Navigate to your project');
  console.log('3. Go to APIs & Services > Credentials');
  console.log('4. Edit your OAuth 2.0 Client ID');
  console.log('5. Add this SHA-1 fingerprint to the Android configuration');
  console.log('6. Add package name: com.mykover.app');
  
  console.log('\n🔗 For production, you\'ll need the release keystore SHA-1');
  console.log('   Use: keytool -list -v -keystore your-release-key.keystore -alias your-key-alias');
} else {
  console.log('\n❌ Could not generate SHA-1 fingerprint automatically');
  console.log('\n🔧 Manual steps:');
  console.log('\n1. Install Java Development Kit (JDK)');
  console.log('   Ubuntu/Debian: sudo apt-get install openjdk-11-jdk');
  console.log('   macOS: brew install openjdk@11');
  console.log('   Windows: Download from https://adoptium.net/');
  
  console.log('\n2. Add Java to your PATH');
  console.log('   Ubuntu/Debian: export PATH=$PATH:/usr/lib/jvm/java-11-openjdk-amd64/bin');
  console.log('   macOS: export PATH=$PATH:/opt/homebrew/opt/openjdk@11/bin');
  
  console.log('\n3. Generate debug keystore (if needed)');
  console.log('   keytool -genkey -v -keystore ~/.android/debug.keystore -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000 -storepass android -keypass android -dname "CN=Android Debug,O=Android,C=US"');
  
  console.log('\n4. Get SHA-1 fingerprint');
  console.log('   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android');
  
  console.log('\n5. Copy the SHA1 value and remove colons');
  console.log('   Example: AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD');
  console.log('   Becomes: aabbccddeeff00112233445566778899aabbccdd');
  
  console.log('\n6. Add to Google Cloud Console');
  console.log('   - Package name: com.mykover.app');
  console.log('   - SHA-1: (your SHA-1 fingerprint)');
} 