pipeline {
    agent any

    // build process - Declarative: Checkout SCM (Jenkinsfile.groovy from git repository)
    // build process - Declarative: Tool Install
    tools {
        nodejs "NodeJS 18.17.0"
    }

    stages {
        // build process - github clone (git 소스를 가져오는 단계)
        stage('github clone') {
            steps {
                script {
                    echo '#################### start of github clone ####################'
                    git credentialsId: 'GitHub', url: 'https://github.com/sungook317/react_project.git'
                    echo '####################  end of github clone  ####################'
                }
            }
        }

        // build process - npm install
        stage('npm install') {
            when {
                anyOf {
                    expression {
                        currentBuild.number == 1 // 파이프라인 최초 빌드인 경우
                    }
                    changeset "package.json" // (package.json from git repository)
                }
            }
            steps {
                echo '#################### start of npm install ####################'
                sh 'npm install'
                echo '####################  end of npm install  ####################'
            }
        }

        // build process - npm build (react 소스를 빌드하고 build 파일을 만드는 단계)
        stage('npm build') {
            when {
                anyOf {
                    expression {
                        currentBuild.number == 1 // 파이프라인 최초 빌드인 경우
                    }
                    changeset "src/*"
                    changeset "package.json" // (package.json from git repository)
                }
            }
            steps {
                script {
                    try {
                        echo '#################### start of npm build ####################'
                        sh 'npm run build'
                    } catch(e) {
                        if(e.toString() == 'hudson.AbortException: script returned exit code 1') {
                            echo '########## stage npm build : error passing ##########'
                            echo '# ' + e.toString()
                            echo '#####################################################'
                        } else {
                            throw e
                        }
                    } finally {
                        echo '####################  end of npm build  ####################'
                    }
                }
            }
        }
    }
}