pipeline {
    agent any

    tools {
        nodejs "NodeJS 18.17.0"
    }

    stages {
        stage('github clone') { // git 소스를 가져오는 단계
            steps {
                git credentialsId: 'GitHub', url: 'https://github.com/sungook317/react_project.git'
            }
        }

        stage('npm install') {
            steps {
                sh 'npm install'
            }
        }

        stage('npm build') { // react 소스를 빌드하고 build 파일을 만드는 단계
            steps {
                script {
                    try {
                        sh 'npm run build'
                    } catch(e) {
                        if(e.toString() == 'hudson.AbortException: script returned exit code 1') {
                            echo '########## stage npm build : error passing ##########'
                            echo '# ' + e.toString()
                            echo '#####################################################'
                        } else {
                            throw e
                        }
                    }
                }
            }
        }
    }
}