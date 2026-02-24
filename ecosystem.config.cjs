module.exports = {
    apps: [
        {
            name: 'url-shortener-backend',
            script: 'app.js',
            instances: 'max', // Use all CPU cores
            exec_mode: 'cluster', // Enable clustering
            env: {
                NODE_ENV: 'production',
            },
            max_memory_restart: '1G', // Restart if memory usage exceeds 1GB
            error_file: './logs/err.log',
            out_file: './logs/out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
        },
    ],
};
