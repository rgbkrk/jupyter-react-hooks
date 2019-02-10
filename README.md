## React hooks & Jupyter

In order to use this app, you'll have to run two separate processes:

```
jupyter notebook --NotebookApp.token='foobar215' --NotebookApp.allow_origin='*' --no-browser
```

```
REACT_APP_JUPYTER_TOKEN='foobar215'  REACT_APP_JUPYTER_URI="http://127.0.0.1:8888" yarn start
```
