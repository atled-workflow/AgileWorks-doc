# API仕様書管理

## 📋 目次

- [概要](#概要)
- [ディレクトリ構成](#ディレクトリ構成)
- [GitHub Actions](#github-actions)
- [作業フロー](#作業フロー)
  - [新規作成](#新規作成新バージョン用のapi追加仕様変更など)
  - [既存修正](#既存修正)
- [デプロイプロセス](#デプロイプロセス)

---

## 🎯 概要

このリポジトリでは、各バージョンごとにYAMLファイルを使用してAPIドキュメントを管理しています。

> [!IMPORTANT]
> **既存の仕様書を修正する場合、該当するすべてのバージョンで更新が必要です。**

---

## 📁 ディレクトリ構成
```
api/
├── R310/                   # バージョンR310のAPIドキュメント
├── R311/                   # バージョンR311のAPIドキュメント
|   ...                     # バージョンR○○のAPIドキュメント
├── main/                   # 最新（開発中）のドキュメント
└── openapi.yaml 等         # R○○の最新バージョンを反映。リリースブランチ作成時にActionsで実行。
```

---

## ⚙️ GitHub Actions

| ワークフロー | トリガー | 説明 |
|:------------|:---------|:-----|
| `convert_openapi3_to_swagger2.yml` | 🔄 PRマージ時 | 変更のあったSwagger 3.1ファイルから3.0と2.0を自動生成 |
| `convert_openapi3_to_swagger2_in_○○.yml` | 🔧 手動/定期実行 | ○○ディレクトリのSwagger 3.1ファイルから3.0と2.0を生成 |
| `create_release_direcrory.yml` | 🚀 リリースブランチ作成時 | リリースディレクトリを作成し、mainの内容をコピー |
| `deploy.yml` | 📤 手動実行 | GitHub Pagesへドキュメントをデプロイ |

---

## 🔧 作業フロー

> [!IMPORTANT]
> **修正するのはopenapi.yamlのみです。**<br>
> **openapi_303.yamlやswagger.yamlは、PRマージ時、Actionsで自動生成/更新されます。**

---
### 💡 HINT
#### VSCodeでSwaggerのプラグインを利用すると、API仕様書をプレビューで見れるので、作成・修正で便利です。
---

### ✨ 新規作成（新バージョン用のAPI追加、仕様変更など）

**手順:**

1. **`main/` フォルダのopenapi.yamlに修正を加える**

以下最新バージョンリリース時
1. **`release/R○○` という名前のリリースブランチを作成**
2. **Actionが自動実行され、以下が行われる:**
   - 新しい `R○○/` フォルダを作成
   - `main/` フォルダの内容を`R○○/` フォルダと`api/` フォルダにコピー
3. **デプロイは手動でAction実行**

---

### 🔄 既存修正

> [!WARNING]
> 該当するすべてのフォルダで修正が必要です

**手順:**

1. **各フォルダのopenapi.yamlに修正を加える**
2. **`release/R○○` という名前のリリースブランチを作成**
3. **Actionが自動実行され、以下が行われる:**
   - `main/` フォルダの内容をコピー
   - 新しい `R○○/` フォルダを作成
4. **デプロイは手動でAction実行**

#### 📌 例1: R310から存在するユーザー作成APIに誤りがあった場合
```diff
修正対象:
+ api/R310/openapi.yaml
+ api/R311/openapi.yaml
+ api/R320/openapi.yaml
+ api/main/openapi.yaml
+ api/openapi.yaml
```

<details>
<summary>🔍 詳細</summary>

R310から存在するAPIの場合、そのバージョン以降のすべてのバージョンと開発中のmainで修正が必要です。

</details>

---

#### 📌 例2: R311から追加された管理者不要 書類表示APIに誤りがあった場合
```diff
修正対象:
+ api/R311/openapi.yaml
+ api/R320/openapi.yaml
+ api/main/openapi.yaml
+ api/openapi.yaml
```

<details>
<summary>🔍 詳細</summary>

R311から追加されたAPIの場合、R311以降のバージョンと開発中のmainで修正が必要です。

</details>

---

#### 📌 例3: R320で仕様変更したAPIの仕様変更前の内容に誤りがあった場合
```diff
修正対象:
+ R310/openapi.yaml
+ R311/openapi.yaml
```

<details>
<summary>🔍 詳細</summary>

R320で仕様変更されたAPIの変更前の内容に誤りがある場合、変更前のバージョンのみ修正します。

</details>

---

## 🚀 デプロイプロセス

### ステップ

1. **PRマージ後**
   - 変更のあった `openapi.yaml` に対して自動的に変換Actionが実行
   - Swagger 3.0.3と2.0バージョンが生成される

2. **デプロイActionを実行**
   - GitHub Pagesへのデプロイがトリガーされる
   - バージョン別のドキュメントサイトが作成/更新される

---

