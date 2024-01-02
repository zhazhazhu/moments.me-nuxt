---
title: Npack 一个包管理器
image:
description: use the right package manager(使用正确的包管理器，这个项目参考大佬 antfu/ni, 我使用了Rust重写，无运行时，无依赖)
date: 2024-1-1
---

# ni

**ni** - 使用正确的软件包管理器

### 使用Rust语言重写，没有运行时，没有依赖项，可以安装和使用，参考@antfu/ni，特定用法应与@antfu/ni一致 [@antfu/ni](https://github.com/antfu/ni)

# 安装

## Using Cargo (Linux/macOS/Windows)

```bash
cargo install npack
```

## Using a script (macOS/Linux/Windows (待测试))

对于bash、zsh和鱼壳，有一个自动安装脚本。

首先确保 curl 已经安装在您的操作系统上。然后执行：

```bash
curl https://ni.qzzhu.cn/install.sh | bash
```

<a href='https://docs.npmjs.com/cli/v6/commands/npm'>npm</a> · <a href='https://yarnpkg.com'>yarn</a> · <a href='https://pnpm.io/'>pnpm</a> · <a href='https://bun.sh/'>bun</a>

<br>


### `ni` - install

```bash
ni

# npm install
# yarn install
# pnpm install
# bun install
```

```bash
ni vite

# npm i vite
# yarn add vite
# pnpm add vite
# bun add vite
```

```bash
ni @types/node -D

# npm i @types/node -D
# yarn add @types/node -D
# pnpm add -D @types/node
# bun add -d @types/node
```

```bash
ni --frozen

# npm ci
# yarn install --frozen-lockfile (Yarn 1)
# yarn install --immutable (Yarn Berry)
# pnpm install --frozen-lockfile
# bun install --no-save
```

```bash
ni -g eslint

# npm i -g eslint
# yarn global add eslint (Yarn 1)
# pnpm add -g eslint
# bun add -g eslint

# this uses default agent, regardless your current working directory
```

<br>

### `nr` - run

```bash
nr dev --port=3000

# npm run dev -- --port=3000
# yarn run dev --port=3000
# pnpm run dev --port=3000
# bun run dev --port=3000
```

```bash
nr

# interactively select the script to run
# supports https://www.npmjs.com/package/npm-scripts-info convention
```

```bash
nr -

# rerun the last command
```

<br>

### `nlx` - download & execute

```bash
nlx vitest

# npx vitest
# yarn dlx vitest
# pnpm dlx vitest
# bunx vitest
```

<br>

### `nu` - upgrade

```bash
nu

# npm upgrade
# yarn upgrade (Yarn 1)
# yarn up (Yarn Berry)
# pnpm update
# bun update
```

```bash
nu -i

# (not available for npm & bun)
# yarn upgrade-interactive (Yarn 1)
# yarn up -i (Yarn Berry)
# pnpm update -i
```

<br>

### `nun` - uninstall

```bash
nun webpack

# npm uninstall webpack
# yarn remove webpack
# pnpm remove webpack
# bun remove webpack
```

```bash
nun -g silent

# npm uninstall -g silent
# yarn global remove silent
# pnpm remove -g silent
# bun remove -g silent
```

<br>

### `nci` - clean install

```bash
nci

# npm ci
# yarn install --frozen-lockfile
# pnpm install --frozen-lockfile
# bun install --no-save
```

if the corresponding node manager is not present, this command will install it globally along the way.

<br>

### `na` - agent alias

```bash
na

# npm
# yarn
# pnpm
# bun
```

```bash
na run foo

# npm run foo
# yarn run foo
# pnpm run foo
# bun run foo
```

<br>

### Global Flags

```bash
# ?               | Print the command execution depends on the agent
ni vite ?

# -C              | Change directory before running the command
ni -C packages/foo vite
nr -C playground dev

# -v, --version   | Show version number
ni -v

# -h, --help      | Show help
ni -h
```

<br>

### Config

```ini
; ~/.nirc

; fallback when no lock found
defaultAgent=npm # default "prompt"

; for global installs
globalAgent=npm
```

```bash
# ~/.bashrc

# custom configuration file path
export NI_CONFIG_FILE="$HOME/.config/ni/nirc"
```

<br>

### How?

**ni** assumes that you work with lockfiles (and you should)

Before it runs, it will detect your `yarn.lock` / `pnpm-lock.yaml` / `package-lock.json` / `bun.lockb` to know current package manager (or `packageManager` field in your packages.json if specified), and runs the [corresponding commands](https://github.com/antfu/ni/blob/main/src/agents.ts).

### Trouble shooting

#### Conflicts with PowerShell

PowerShell comes with a built-in alias `ni` for the `New-Item` cmdlet. To remove the alias in your current PowerShell session in favor of this package, use the following command:

```PowerShell
'Remove-Item Alias:ni -Force -ErrorAction Ignore'
```

If you want to persist the changes, you can add them to your PowerShell profile. The profile path is accessible within the `$profile` variable. The ps1 profile file can normally be found at

- PowerShell 5 (Windows PowerShell): `C:\Users\USERNAME\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`
- PowerShell 7: `C:\Users\USERNAME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`
- VSCode: `C:\Users\USERNAME\Documents\PowerShell\Microsoft.VSCode_profile.ps1`

You can use the following script to remove the alias at shell start by adding the above command to your profile:

```PowerShell
if (-not (Test-Path $profile)) {
  New-Item -ItemType File -Path (Split-Path $profile) -Force -Name (Split-Path $profile -Leaf)
}

$profileEntry = 'Remove-Item Alias:ni -Force -ErrorAction Ignore'
$profileContent = Get-Content $profile
if ($profileContent -notcontains $profileEntry) {
  ("`n" + $profileEntry) | Out-File $profile -Append -Force -Encoding UTF8
}
```

#### `nx` and `nix` is no longer available

We renamed `nx`/`nix` to `nlx` to avoid conflicts with the other existing tools - [nx](https://nx.dev/) and [nix](https://nixos.org/). You can always alias them back on your shell configuration file (`.zshrc`, `.bashrc`, etc).

```bash
alias nx="nlx"
# or
alias nix="nlx"
```
