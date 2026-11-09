# Authenticated editorial approval — pilot

**Status:** development branch only. Not enabled on the live site. No public-facing approval button.

## Security model
GitHub login authenticates the editor. Only the repository owner GitHub username `drtimjames` can run the publish job. The approval is an explicit, manually initiated **Run workflow** action in GitHub Actions. A release PR must be open, non-draft, target `main`, come from the same repository, have label `charlemagne-approved-release`, and match the **exact full 40-character commit SHA** Tim reviewed. Only top-level Charlemagne HTML/CSS files are allowed; drafts and workflow files are excluded. The workflow uses the built-in GitHub token, not a personal access token or paid Codex.

## Supervised release checklist
1. Prepare a release PR with final article, homepage and archive links, verified source record, and no editorial-only text. Keep it **draft** until ready for Tim's review.
2. Provide Tim a preview, a concise change summary, the PR URL, and the full head commit SHA. No publication before Tim explicitly approves that exact version.
3. After approval, mark PR **Ready for review**, apply the `charlemagne-approved-release` label, and check the PR diff. These steps alone must never publish.
4. Tim signs into GitHub, opens **Actions → Charlemagne — Authenticated Editorial Approval → Run workflow**, enters PR number and exact SHA, then presses **Run workflow**. This is the authenticated equivalent of **Approved by Tim**.
5. The workflow checks authorization and scope and merges the approved PR. Then verify GitHub Pages and the live article URL manually; confirm archive/home links and prepare the Substack announcement. Do not claim the article is live until it loads.

## Activation
Review and merge this development PR **separately** to install the workflow on `main`. Installing it does not publish any dispatch. The workflow is not runnable from GitHub Actions until present on the default branch. Test first with a harmless, non-public sample PR and verify unauthorized users, changed SHAs, draft PRs, and disallowed paths are rejected.

## Limitations
This is a secure **GitHub Actions approval control**, not yet an embedded web-page button. GitHub Pages is public static hosting; a standalone public HTML button cannot safely authenticate publication. For a future one-click private interface, use GitHub OAuth or an authenticated GitHub App. The GitHub repository owner must initiate the Actions run.
