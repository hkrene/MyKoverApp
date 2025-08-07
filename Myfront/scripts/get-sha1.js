#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Getting SHA-1 fingerprint for Google Authentication...\n');

// Function to get SHA-1 from keystore using Google's command format
function getSHA1FromKeystore(keystorePath, keystorePassword, keyAlias, keyPassword) {
  try {
    // Use Google's recommended command format
    const command = `keytool -keystore "${keystorePath}" -list -v`;
    const output = execSync(command, { encoding: 'utf8' });
    
    const sha1Match = output.match(/SHA1:\s*([A-F0-9:]+)/i);
    if (sha1Match) {
      return sha1Match[1].replace(/:/g, '').toLowerCase();
    }
  } catch (error) {
    console.error('❌ Error reading keystore:', error.message);
  }
  return null;
}

// Function to get debug SHA-1
function getDebugSHA1() {
  try {
    // Try to get debug keystore path
    const userHome = process.env.HOME || process.env.USERPROFILE;
    const debugKeystorePath = path.join(userHome, '.android', 'debug.keystore');
    
    if (fs.existsSync(debugKeystorePath)) {
      console.log('📱 Found debug keystore, getting debug SHA-1...');
      console.log('🔧 Using command: keytool -keystore ~/.android/debug.keystore -list -v');
      
      const debugSHA1 = getSHA1FromKeystore(debugKeystorePath, 'android', 'androiddebugkey', 'android');
      if (debugSHA1) {
        console.log('✅ Debug SHA-1:', debugSHA1);
        return debugSHA1;
      }
    }
  } catch (error) {
    console.error('❌ Error getting debug SHA-1:', error.message);
  }
  return null;
}

// Function to generate SHA-1 using Google's command format
function generateSHA1() {
  try {
    console.log('🔧 Generating SHA-1 using Google\'s command format...');
    console.log('📋 Command: keytool -keystore ~/.android/debug.keystore -list -v');
    
    const command = 'keytool -keystore ~/.android/debug.keystore -list -v';
    const output = execSync(command, { encoding: 'utf8' });
    
    const sha1Match = output.match(/SHA1:\s*([A-F0-9:]+)/i);
    if (sha1Match) {
      const sha1 = sha1Match[1].replace(/:/g, '').toLowerCase();
      console.log('✅ SHA-1 Fingerprint:', sha1);
      return sha1;
    }
  } catch (error) {
    console.error('❌ Error generating SHA-1:', error.message);
  }
  return null;
}

// Main execution
console.log('🚀 Starting SHA-1 generation...\n');

// Try to get debug SHA-1 first
let sha1 = getDebugSHA1();

if (!sha1) {
  console.log('⚠️  Debug keystore not found, trying alternative method...');
  sha1 = generateSHA1();
}

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
  console.log('   Use: keytool -keystore path-to-release-keystore -list -v');
} else {
  console.log('\n❌ Could not generate SHA-1 fingerprint');
  console.log('\n🔧 Manual steps using Google\'s command format:');
  console.log('\n📱 For Debug Keystore:');
  console.log('   keytool -keystore ~/.android/debug.keystore -list -v');
  console.log('\n🏭 For Production Keystore:');
  console.log('   keytool -keystore path-to-your-release-keystore -list -v');
  console.log('\n📋 Steps:');
  console.log('1. Run the command above');
  console.log('2. Copy the SHA1 value from the output');
  console.log('3. Remove colons and convert to lowercase');
  console.log('4. Add to Google Cloud Console');
} 