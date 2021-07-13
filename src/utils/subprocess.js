let {    spawn } = require('child_process')

const subprocess = class {
    constructor(cmd) {
        this.cmd = cmd
        this.subprocess = null
        this.promise=false
    }
    promise(){
        this.promise=true
    }
    start(delay=100, callback=null) {
        this.subprocess = spawn(this.cmd, [], {
            shell: true
        });

        this.subprocess.stdout.on('data', (data) => {
            console.log(data.toString());
        })
        this.subprocess.stderr.on('data', (data) => {
            console.log('Error: ' + data);
        })

        this.subprocess.on('close', (code, signal) => {
            console.log(`Process ${this.cmd} killed with code:  ${code} and signal ${signal}`);
        })
        
        console.log(new Date().toUTCString())
        setTimeout(()=>{
            console.log(`delay triggered of ${delay} ms`)
            console.log(new Date().toUTCString())
            if (callback) callback()
        },delay)
    }
    stop(delay=100, callback=null)
    {
        this.subprocess.kill("SIGKILL")
        setTimeout(()=>{
            console.log(`delay for closure triggered of ${delay} ms`)
            console.log(new Date().toUTCString())
            if (callback) callback()
        },delay)
    }
}

module.exports={
  subprocess
}

