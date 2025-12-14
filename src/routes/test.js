  // ------------------ Консоль ------------------
  const jsConsole = {
    cmdList: [],
    cmdPrompt: '$>',
    cmdHistory: [],
    cmdHistorySize: 16,
    cmdIndex: -1,
    inputElm: null,
    outputElm: null,
    contentElm: null,
    inputBuffer: '',
    tmpBuffer: '',
    inputBufferMax: 256,

    init: function() {
      this.inputElm = document.getElementById('console_input');
      this.outputElm = document.getElementById('console_output');
      this.contentElm = document.getElementById('console_content');

      window.addEventListener('keydown', e => this.handleKey(e));

      this.inputClear();
    },

    handleKey: function(e) {
      const self = jsConsole;

      if (e.key === 'Backspace') {
        e.preventDefault();
        self.inputBuffer = self.inputBuffer.slice(0, -1);
        self.inputLog(self.inputBuffer);
      } else if (e.key === 'Enter') {
        const cmdString = self.inputBuffer;
        self.inputClear();
        self.log(self.cmdPrompt + cmdString);
        self.cmdIndex = -1;

        if (cmdString.trim() !== '') {
          const parsed = self.parseCmd(cmdString);
          self.runCmd(parsed.cmd, parsed.args);
          self.addCmdHistory(cmdString);
        }
      } else if (e.key === 'ArrowUp') {
        if (self.cmdHistory.length && self.cmdIndex < self.cmdHistory.length - 1) {
          self.cmdIndex++;
          self.inputBuffer = self.cmdHistory[self.cmdIndex];
          self.inputLog(self.inputBuffer);
        }
      } else if (e.key === 'ArrowDown') {
        if (self.cmdIndex > 0) {
          self.cmdIndex--;
          self.inputBuffer = self.cmdHistory[self.cmdIndex];
        } else {
          self.cmdIndex = -1;
          self.inputBuffer = '';
        }
        self.inputLog(self.inputBuffer);
      } else if (e.key.length === 1 && self.inputBuffer.length < self.inputBufferMax) {
        self.inputBuffer += e.key;
        self.inputLog(self.inputBuffer);
      }
    },

    addCmd: function(name, desc, help, callback, flags) {
      this.cmdList.push({ name: name.toLowerCase(), desc, help, callback, flags });
      this.cmdList.sort((a, b) => a.name.localeCompare(b.name));
    },

    getCmd: function(name) {
      return this.cmdList.find(c => c.name === name) || null;
    },

    parseCmd: function(str) {
      const parts = str.trim().replace(/\s+/g, ' ').split(' ');
      return { cmd: parts[0], args: parts.slice(1) };
    },

    runCmd: function(cmd, args) {
      const command = this.getCmd(cmd);
      if (!command) {
        this.log('Command not recognized : ' + cmd);
      } else {
        command.callback(args);
      }
    },

    log: function(str) {
      const line = document.createElement('div');
      line.textContent = str;
      this.outputElm.appendChild(line);
      this.contentElm.scrollTop = this.contentElm.scrollHeight;
    },

    inputLog: function(str) {
      this.inputBuffer = str;
      this.inputElm.textContent = this.cmdPrompt + str;
    },

    inputClear: function() {
      this.inputBuffer = '';
      this.inputElm.textContent = this.cmdPrompt;
    },

    addCmdHistory: function(str) {
      this.cmdHistory.unshift(str);
      if (this.cmdHistory.length > this.cmdHistorySize) {
        this.cmdHistory.pop();
      }
    },

    clearLog: function() {
      this.outputElm.innerHTML = '';
    }
  };

  // ------------------ Команды ------------------
  jsConsole.addCmd(
    'help',
    'provides help information for commands',
    'Usage: help [command]',
    function(args) {
      if (!args.length) {
        jsConsole.log('For more information type "help command"\n');
        jsConsole.cmdList.forEach(c => {
          if (!c.flags?.hidden) jsConsole.log(c.name + '\t\t' + c.desc);
        });
      } else {
        const cmd = jsConsole.getCmd(args[0]);
        if (!cmd) jsConsole.log('No help for ' + args[0]);
        else typeof cmd.help === 'string' ? jsConsole.log(cmd.help) : cmd.help();
      }
    }
  );

  jsConsole.addCmd('clear', 'clears the command window', '', function() {
    jsConsole.clearLog();
  });

  jsConsole.addCmd(
    'version',
    'shows the OS version',
    '',
    function() {
      jsConsole.log('Javascript OS [Version 1.2.4275]\nCopyright (c) 1867 Javascript Corporation.');
    }
  );

  jsConsole.addCmd(
    'date',
    'prints the current date',
    'Usage: date | date system',
    function(args) {
      const date = args[0] === 'system' ? new Date(1867, 6, 11, 16, 0, 0) : new Date();
      jsConsole.log(date.toString());
    }
  );

  jsConsole.addCmd(
    'hello',
    'prints a welcome message',
    'Usage: hello [name]',
    function(args) {
      jsConsole.log('Welcome ' + args.join(' '));
    }
  );

  jsConsole.addCmd(
    'ballestine',
    '???',
    '',
    function() {
      jsConsole.log('will kill you anyway');
    }
  );

  // ------------------ Инициализация ------------------
  window.addEventListener('load', () => {
    jsConsole.init();
    jsConsole.runCmd('version', []);
    jsConsole.log('For help on available commands type "help"');
  });