# Git学习

---

[有道云笔记链接](http://note.youdao.com/noteshare?id=9f124447b6aeaf175880192d95855473&sub=A058D23C4BC44BDAA2DDC124AFADCE88)

---

## 集中式版本控制系统和分布式版本控制系统

### 一、 集中式版本控制系统 SVN

> 通过一个单一的集中管理的服务器，保存所有文件的修订版本，而所有系统工作的人们都通过客户端连到这台服务器，取出**最新**的文件或提交更新
- 优点：
    - 开发人员可以了解到历史提交记录
    - 管理员可以轻松掌握每个开发者的权限，并集中式管理服务器
- 缺点
    - 中央服务器单点故障
    - 比如服务器宕机、中心数据库所在磁盘发生损坏
### 二、分布式版本控制系统 Git
> 分布式版本控制系统中，客户端并不是只提取最新版本的文件快照，而是把代码仓库完整的镜像下来。
这么以来，任何一处协同工作用的服务器发生故障，事后都可以用任何一个镜像出来的本地仓库恢复。
因为每一次的克隆操作，实际上都是一次对代码仓库的完整备份。




---

## 关于Git
### 一、近乎所有操作都是本地执行
- 在Git中绝大多数操作都只需要访问本地文件和资源（因为你每次clone下来都是整个代码仓库的完整镜像）  <br>
- 因此`git log`只需要直接从本地数据库中读取项目历史


### 二、Git保证完整性
Git通过SHA-1散列（hash，哈希）用于计算校验（类似与HTTP请求时使用的ETags的md5校验方法），生成一段字符串，是通过字符串（哈希）来做索引，因此Git保存的不是文件的差异或变化，而是一系列不同时刻的文件快照

### 三、Git三种状态
状态 | 描述 | 对应命令行
--- | --- | ---
已提交 | 表示数据已经安全的保存在本地数据库中 | `git commit [filename]` 后进入已提交状态
已修改 | 表示修改了文件，但还没保存到数据库中 | `git add [filename]`后又修改了文件，进入已修改状态
已暂存 | 表示对一个已修改的文件的当前版本做了标记，使之包含在下次提交的快照中 | `git add [filename]`后文件进入暂存区域


状态 | 含义
--- | ---
Untracked files: | 未跟踪的文件，表明未使用`git add [filename]`提交，使用`git add [filename]`后进入已暂存状态
Change to be committed | 使用`git add [filename]`命令之后，文件进入**已暂存**状态，此处提示需要使用`git commit -m`提交到本地数据库
Change not staged for commit | 使用`git add [filename]`命令之后文件再次被修改，表示已跟踪的文件内容发生了变化，但还没有放到暂存区，需再次执行`git add`命令，添加内容到下一次提交中



---


## Git命令行
### 一、获取Git仓库
#### 1. 在现有目录中初始化仓库

> 命令行： `git init`
```
git init
git add *
git commit -m 'new version'
```

#### 2. 克隆现有的仓库
> 命令行：`git clone [remote-name]`

自定义本地参考名字
`git clone [remote-name] [local-name]`

### 二、记录每次更新到仓库
#### 1. 检查当前文件状态
> 命令行：`git status`

#### 2. 跟踪新文件
> 命令行：`git add README.md`

这个命令执行之后，文件就进入暂存区，处于已暂存状态

#### 3. 状态简览
> 命令行：`git status -s`或 `git status --short`

#### 4. 忽略文件
> 添加`.gitignore`文件并在内添加需要忽略的文件

```
touch .gitignore
vi .gitignore
// 添加node_modules文件到.gitignore内并保存
```

#### 5. 查看已暂存和未暂存的修改
> 命令行：`git diff`或`git diff --cache`

#### 6. 提交更新
> 命令行`git commit -m 'xxxx'`或`git commit -v`进入vim编辑器

提交是记录的是放在暂存区域的快照。任何还未暂存的仍保持已修改的状态，可以在下次提交时纳入版本管理。每次运行提交操作，都是对你的项目做一次快照，以后可以回到这个状态，或者进行比较。

#### 7. 跳过使用暂存区域
> 命令行：`git commit -a -m 'xxxx'`

#### 8. 移除文件
> 命令行：`git rm`

相当于操作了以下两个命令：
```
rm [remove-name]
git add *
```

#### 9. 移动文件
> 命令行: `git vm file_from file_to`

例如
```
git mv README.md README
```
相当于运行了下面三条命令：
```
mv README.md README
git rm README.md
git add README
```


---


### 三、查看提交历史
> 命令行: `git log`


---

### 四、撤销操作
#### 1. 提交完成后添加漏掉的文件，并覆盖上一条提交历史
> 命令行： `git commit --amend`

一般用于如下情况:
`git commit -m 'initial commit'`
`git add forgotten_file`
`git commit --amend`
最终你只会有一个提交，第二次提交将代替第一次提交结果
#### 2. 取消暂存
> 命令行： `git reset HEAD <file>`

比如`git add [filename]`之后状态改成`Change to bo committed`,
使用`git reset HEAD <file>`可以取消暂存,一般来说都会有提示
#### 3. 撤销对已跟踪文件的修改
> 命令行： `git checkout -- <file>`

一个文件已经`git commit`，当你再次修改文件之后文件状态变为`changes not staged for commit`
使用撤销对之前所有的修改，一般来说你使用`git status`之后都会有提示


---


### 五、远程仓库的使用
#### 1. 查看远程仓库信息
> 命令行： `git remote -v`

#### 2. 添加远程仓库
> 命令行： `git remote add <shortname> <url>`

添加一个新的远程Git仓库，同时制定一个你可以轻松引用的简写，如
`git remote add pd https://github.com/paulboone/ticgit`，
现在可以在命令中使用字符串`pd`来代替整个URL，如
`git fetch pd`

#### 3. 从远程仓库中抓取或拉取
> 命令行： `git fetch [remote-name]`

- 这个命令会将数据拉取到你的本地仓库，但并不会自动合并或修改你当前的工作
- 如果你有一个分支设置为跟踪（tracked）一个远程分支（通过`git remote show origin`命令可以查看具体信息），可以使用`git pull`命令来自动的抓取然后合并远程分支到当前分支
- 通常情况下`git clone`命令会自动设置本地master分支跟踪克隆的远程仓库的master分支（可以使用`git clone -b <branchname> [remote-name]`克隆指定分支到本地，然后设置本地指定分支跟踪克隆的远程分支）
- 在此基础上运行`git pull`通常会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的分支。

#### 4. 推送到远程仓库
> 命令行：`git push [remote-name] [branch-name]`

- `git push origin master`此处`origin`是`clone`时会自动帮你设置好的（如果你不自己改变）、`master`分支同理，默认就是这个分支 
- 只有当你有所克隆服务器的写入权限，并且之前没有人推送过时，这条命令才能生效。
- 当你和其他人在同一时间克隆，他们先推送到上游然后你再推送到上游，你的推送就会毫无疑问地被拒绝。你必须先将他们的工作拉取下来并将其合并进你的工作后才能推送。


#### 5. 查看远程仓库
> 命令行： `git remote show [remote-name]`

查看某一个远程仓库的更多信息
```
$ git remote show origin
* remote origin
  Fetch URL: git@github.com:tangxiao258/Demo.git
  Push  URL: git@github.com:tangxiao258/Demo.git
  HEAD branch: master  // 告诉你当前正处在master分支
  Remote branch:
    master tracked  // 当前跟踪的远程分支是mater分支
  Local branch configured for 'git pull':
    master merges with remote master  // 你使用git pull命令，就会抓取所有的远程引用，然后将远程master分支合并到本地mater分支
  Local ref configured for 'git push':
    master pushes to master (up to date)
```

#### 6. 远程仓库的移除和重命名
> 重命名： `git remote rename` <br>移除：`git remote rm [remote-name]`

通过该命令，可以修改一个远程仓库的简写名（默认是origin）
```
git remote rename pd paul
```
`git remote rm paul`移除名叫`paul`的远程仓库


---
## Git分支
### 一、分支简介
#### 1. 分支创建
> 命令行： `git branch [branch-name]`

Git如何知道当前在哪一个分支上？
- 它有一个名为`HEAD`的特殊指针，只想当前所在的本地分支
- `git branch`命令仅仅*创建一个新分支*，并不会自动切换到新分支中去。
- 使用`git log --oneline --decorate`命令查看各个分支当前所指的对象。


#### 2. 分支切换
> 命令行： `git checkout [branch-name]`

使用这个命令后`HEAD`就指向另一个分支了
- 使用`git log --oneline --decorate --graph --all`命令查看分叉历史



### 二、分支的新建与合并
#### 1. 新建分支并切换到对应分支
> 命令行： `git checkout -b [branch-name]`

该命令相当于下面两条命令的简写：
```
git branch [branch-name]
git checkout [branch-name]
```

#### 2. 分支合并
> 命令行： `git merge [branch-name]`

- fast-forward合并模式
    - 在合并时，如果有“快进(fast-forward)”，表明`HEAD`所在当前分支是你所要合并的分支的直接上游
    - 所以Git只是简单的将指针向前移动
    - 换句话说，当你试图合并两个分支是，如果顺着一个分支走下去能够到达另一个分支
    - 那么Git在合并两者时，只会简单的将指针向前推移
- diverged分叉模式
    - 需要合并的两个分支并不是在一条直线上，而是从一个更早的地方开始分叉（diverged）
    - 这时候Git会使用两个分支末端所指的快照，以及这两个分支的工作祖先，做一个简单的三方合并
    - 如果有冲突，会提示CONFLICT，需要手动修改冲突文件后再提交

#### 3. 分支删除
> 命令行： `git branch -d [branch-name]`


### 三、分支管理
#### 1. 产看所有分支
> 命令行： `git branch`

- 查看每一个分支的最后一次提交 `git branch -v`
- 产看哪些分支已经合并到当前分支 `git branch --merged`
- 查看所有未包含合并工作的分支 `git branch --no-merged`
- 如果包含未合并工作的分支，使用`git branch -d [branch-name]`时会失败，需要合并之后才可删除该分支
- `git branch -f [branch-name] [ddof]`切换master分支指向到指定提交记录上

### 四、变基
> 命令行： `git rebase [branch-name]`

- 假设当前分支为已修改完成的分支
- 现在需要把该分支的修改合并到master分支上
- 首先执行`git rebase master`
- 该分支就已经处于master分支之后了
- 再运行`git merge master`合并master分支
- 合并之后，这个分支就可以删掉了

## 单词表

单词 | 意思 | 对应命令行 | 执行含义 
--- | --- | --- | ---
amend | 修改、修订 | git commit --amend | 撤销操作
remote | 远程的，远程操作 | git remote -v  | 查看远程仓库信息
fetch | 接来，拿取 | git fetch | 从远程仓库中抓取或拉去，但不会自动合并本地代码
push | 推送 | git push [remote-name] [branch-name] | 推送到远程仓库
branch | 树枝、分支 | git branch [branch-name] | 创建一个新的分支
checkout | 切换 | git checkout [branch-name] | 分支切换
merge | 融合、相融 | git merge [branch-name] | 分支合并
conflict | 冲突 | 在git merge 后提示信息，合并有冲突 | 
automatic | 自动的 | automatic merge failed; fix conflicts and then commit the result
rebase | 垫底 | git rebase master | 给master分支垫底/将该分支合并到master分支后
reset | 重置、重排 | git reset HEAD^1 | 回到上一个节点，用于本地分支
checkout | 切换 | git checkout developer | 将HEAD头指针指向developer分支
revert | 撤销 | git revert HEAD | 撤销上一次更改，用与远程分支，撤销过后就可提交到远程分支
cherry-pick | 最佳选择、优选、变形 | git cherry-pick C3 C4 C7 | 提交指定修改内容到当前分支上去
