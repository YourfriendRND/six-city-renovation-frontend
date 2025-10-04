pipeline{
    agent none 
    triggers {
        githubPush()
    }
    stages {
        stage('Checkout') {
            agent any
            steps {
                git branch: 'dev',
                url: 'https://github.com/YourfriendRND/six-city-renovation-frontend'
            }
        }

        stage('Build') {
            agent {
                docker {
                    image 'node:20.17.0-alpine'
                    args '-u root:root'
                }
            }
            steps {
                cache(maxCacheSize: 250, caches: [
                    arbitraryFileCache(
                        path: "node_modules",
                        includes: "**/*",
                        cacheValidityDecidingFile: "package-lock.json"
                    )
                ]) {
                    sh '''
                        npm install
                        npm run build
                    '''
                }
            }
        }

        stage('Deploy') {
            agent any
            steps {
                script {
                    def dockerComposeFile = 'docker-compose.yml'
                    def envFile = '.env'
                    sshagent(['github-six-city-actions']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no -T jenkins@5.180.136.186 << 'REMOTE_SCRIPT'
                            cd /var/lib/jenkins/six-city-renovation-frontend
                            git pull origin dev
                            docker compose -f ${dockerComposeFile} --env-file ${envFile} up -d --build
                            docker system prune -f 
REMOTE_SCRIPT
                        """
                    }
                }
            }
        }
    }
}
