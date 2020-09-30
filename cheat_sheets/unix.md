# Cheat Sheet

## Unix

#### Run rspec for every file that matches the searched "word"

```
grep -r -l --include \*.rb word spec/* | xargs rspec
```
