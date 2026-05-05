pipeline {
    agent any

    tools {
        nodejs 'Node_24.15.0'
    }

    environment {
        ANDROID_HOME     = '/opt/android-sdk'
        ANDROID_SDK_ROOT = '/opt/android-sdk'
        PATH             = "$PATH:/opt/android-sdk/cmdline-tools/latest/bin:/opt/android-sdk/platform-tools"
    }

    stages {

        stage('Environment Check') {
            steps {
                sh '''
                    echo "=== Environment Check ==="
                    echo "Node: $(node -v)"
                    echo "NPM: $(npm -v)"
                    echo "ANDROID_HOME: $ANDROID_HOME"
                    free -h
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx jest --ci --forceExit --passWithNoTests --reporters=default'
            }
            post {
                always {
                    echo '=== Test selesai ==='
                }
                failure {
                    error '❌ Testing gagal! Build dihentikan.'
                }
            }
        }

        stage('Expo Prebuild') {
            steps {
                sh 'npx expo prebuild --platform android --clean'
            }
        }

        stage('Configure Gradle') {
            steps {
                sh '''
                    cd android

                    # Hapus entry lama yang bentrok
                    grep -v "org.gradle.jvmargs\\|org.gradle.daemon\\|org.gradle.parallel\\|REACT_NATIVE_ARCHITECTURES\\|org.gradle.workers" gradle.properties > gradle.properties.tmp
                    mv gradle.properties.tmp gradle.properties

                    # Tulis konfigurasi baru
                    echo "REACT_NATIVE_ARCHITECTURES=arm64-v8a"                              >> gradle.properties
                    echo "org.gradle.daemon=false"                                            >> gradle.properties
                    echo "org.gradle.parallel=false"                                          >> gradle.properties
                    echo "org.gradle.workers.max=1"                                           >> gradle.properties
                    echo "org.gradle.jvmargs=-Xmx2g -XX:MaxMetaspaceSize=512m -XX:+UseG1GC" >> gradle.properties

                    echo "=== gradle.properties yang dipakai ==="
                    cat gradle.properties
                '''
            }
        }

        stage('Build APK') {
            steps {
                sh '''
                    cd android
                    chmod +x gradlew
                    ./gradlew assembleRelease --no-daemon --max-workers=1
                '''
            }
        }

        stage('Archive APK') {
            steps {
                archiveArtifacts artifacts: '**/*.apk', fingerprint: true
            }
        }

        stage('Deploy ke Server') {
            steps {
                sshagent(credentials: ['<ID_CREDENTIAL_SSH_KAMU>']) {
                    sh '''
                        APK_PATH=$(find . -type f -name "*.apk" | head -n 1)

                        if [ -z "$APK_PATH" ]; then
                            echo "ERROR: APK tidak ditemukan!"
                            exit 1
                        fi

                        echo "APK ditemukan: $APK_PATH"
                        ssh -o StrictHostKeyChecking=no moodbites@103.185.52.161 "mkdir -p /var/www/landingPage"
                        scp -o StrictHostKeyChecking=no "$APK_PATH" moodbites@103.185.52.161:/var/www/landingPage/moodbites.apk
                        echo "=== Deploy Selesai! ==="
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build dan deploy berhasil!'
        }
        failure {
            echo '❌ Pipeline gagal. Cek log di atas.'
        }
    }
}