## Setup

To install sandboxjs open a terminal and run the following:

```bash
$ npm install sandboxjs
```

To start using sandboxjs you have to get a webtask token using wt-cli . If you already use wt-cli use:

```bash
$ wt profile ls
```

If you don't have a profile already, then you have to install wt-cli and initialize a new profile:

```bash
$ npm install -g wt-cli
$ wt init
```

In order to configure a webtask profile you need to provide an email or phone number. You will receive a verification code there which you will have to input to the terminal.
Now that you have a profile setup, let's work on some simple examples.