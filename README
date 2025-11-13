# API ドキュメント管理

<div align="center">

📚 各バージョンごとにYAMLファイルでAPIドキュメントを管理するリポジトリです

</div>

---

## 📋 目次

- [概要](#概要)
- [ディレクトリ構成](#ディレクトリ構成)
- [GitHub Actions](#github-actions)
- [作業フロー](#作業フロー)
  - [新規作成](#新規作成新バージョン用のapi追加仕様変更など)
  - [既存修正](#既存修正)
- [デプロイプロセス](#デプロイプロセス)
- [注意事項](#注意事項)

---

## 🎯 概要

このリポジトリでは、各バージョンごとにYAMLファイルを使用してAPIドキュメントを管理しています。

> [!IMPORTANT]
> **既存のドキュメントを修正する場合、該当するすべてのバージョンで更新が必要です。**

---

## 📁 ディレクトリ構成
```
api/
├── R310/                   # バージョンR310のAPIドキュメント
├── R320/                   # バージョンR320のAPIドキュメント
├── main/                   # 最新（開発中）のドキュメント
└── openapi.yaml 等         # R○○の最新バージョンを反映
                            # リリースブランチ作成時にActionsで自動更新

.github/workflows/          # GitHub Actions ワークフロー管理
├── convert_openapi3_to_swagger2.yml
├── convert_openapi3_to_swagger2_in_R310.yml
├── convert_openapi3_to_swagger2_in_R320.yml
├── create_release_direcrory.yml
└── deploy.yml
```

---

## ⚙️ GitHub Actions

| ワークフロー | トリガー | 説明 |
|:------------|:---------|:-----|
| `convert_openapi3_to_swagger2.yml` | 🔄 PRマージ時 | 変更のあったSwagger 3.1ファイルから3.0と2.0を自動生成 |
| `convert_openapi3_to_swagger2_in_R310.yml` | 🔧 手動/定期実行 | R310ディレクトリのSwagger 3.1ファイルから3.0と2.0を生成 |
| `convert_openapi3_to_swagger2_in_R320.yml` | 🔧 手動/定期実行 | R320ディレクトリのSwagger 3.1ファイルから3.0と2.0を生成 |
| `create_release_direcrory.yml` | 🚀 リリースブランチ作成時 | リリースディレクトリを作成し、mainの内容をコピー |
| `deploy.yml` | 📤 手動実行 | GitHub Pagesへドキュメントをデプロイ |

---

## 🔧 作業フロー

### ✨ 新規作成（新バージョン用のAPI追加、仕様変更など）

**手順:**

1. **`main/` フォルダに修正を加える**
2. **`release/R○○` という名前のリリースブランチを作成**
3. **Actionが自動実行され、以下が行われる:**
   - `main/` フォルダの内容をコピー
   - 新しい `R○○/` フォルダを作成

---

### 🔄 既存修正

> [!WARNING]
> 該当するすべてのバージョンで修正が必要です

#### 📌 例1: R310から存在するユーザー作成APIに誤りがあった場合
```diff
修正対象:
+ R310/openapi.yaml
+ R311/openapi.yaml
+ R320/openapi.yaml
+ main/openapi.yaml
```

<details>
<summary>🔍 詳細</summary>

R310から存在するAPIの場合、そのバージョン以降のすべてのバージョンと開発中のmainで修正が必要です。

</details>

---

#### 📌 例2: R311から追加された管理者不要 書類表示APIに誤りがあった場合
```diff
修正対象:
+ R311/openapi.yaml
+ R320/openapi.yaml
+ main/openapi.yaml
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

## ⚠️ 注意事項

> [!NOTE]
> - ✅ 変更を行う前に、どのバージョンで更新が必要か必ず確認してください
> - ✅ Actions完了後、変換されたファイルをテストしてください
> - ✅ エラー修正時は、すべてのバージョン間で整合性を保ってください

---

<div align="center">

Made with

</div>
