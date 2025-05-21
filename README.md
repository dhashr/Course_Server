Server Setup
    mkdir Server to create folder
    cd Server - move inside the folder
    npm init -y - for just creating empty package.json file

    After creating file install packages and dependcies 
        => npm install cors dotenv express mongoose helmet
        => npm install -D typescript @types/express @types/cors @types/node nodemon ts-node
        => npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev for eslint.

    dependcies packages for live server, devdependcies packages for local purpose.

    create file .gitignore for git should ignore the files like nodemodules.

        => .env
        => dist/
        => node_modules

    Next create tsconfig.json configuration file for convert and run the ts file to js.
    It specifies the root files and the compiler options required to compile the project.  
    Once create the file setup the configuration
    {
        "compilerOptions": {
            "target": "es2016",
            "jsx": "preserve",
            "module": "commonjs",
            "allowJs": true,
            "outDir": "./dist",
            "esModuleInterop": true,
            "forceConsistentCasingInFileNames": true,
            "strict": true,
            "skipLibCheck": true
        },
        "exclude": ["node_modules", "dist", "client"]
    }

    mkdir src for source file.
    inside src create index.ts or app.ts file for main file.
    In app.ts file we can create db connection, mongoose, server, router configuration.

    MongoDB configuration setup in your local and atlas to compass connection.
      URL = https://chatgpt.com/c/681dde71-4b20-8012-9bc7-30774a7865f6
