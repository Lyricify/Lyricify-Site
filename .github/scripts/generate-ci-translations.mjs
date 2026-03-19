import {createHash} from 'node:crypto';
import {promises as fs} from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const cacheRoot = path.join(repoRoot, '.cache', 'ci-translations');
const cacheFilesRoot = path.join(cacheRoot, 'files');
const manifestPath = path.join(cacheRoot, 'manifest.json');

const promptVersion = '2026-03-19-v3';
const model = process.env.TRANSLATION_MODEL;
const apiBaseUrl = (
    process.env.TRANSLATION_BASE_URL || 'https://api.openai.com/v1'
).replace(/\/$/, '');
const apiKey = process.env.TRANSLATION_API_KEY;
const canUseApiTranslation = Boolean(apiKey && model);
const shouldSkipTranslations =
    process.env.SKIP_CI_TRANSLATIONS === '1' ||
    process.env.SKIP_CI_TRANSLATIONS === 'true';

const commonTranslationInstructions = [
    'Output must be a complete translated file body in the same format as the source file.',
    'Preserve Astro frontmatter fences, markdown structure, HTML structure, JSON structure, imports, exports, identifiers, URLs, anchors, paths, and code blocks.',
    'Do not add commentary, explanations, or code fences outside the required output markers.',
    'Do not translate file paths, import paths, image paths, URLs, slug-like strings, CSS selectors, or code identifiers.',
    'Keep formatting stable so repeated runs produce minimal diffs.',
];

const terminologyGlossary = [
    'Use the following canonical Traditional Chinese terms whenever they appear in the Simplified Chinese source:',
    '桌面歌词 => 桌面歌詞',
    '灵动词岛 => 靈動詞島',
    '任务栏歌词 => 工作列歌詞',
    'Apple Music 歌词 => Apple Music 歌詞',
    '妙控条 => 妙控條',
    '对唱视图 => 同框對唱',
    '背景人声 => 背景人聲',
    '呼吸点 => 呼吸點',
    '拖动效果 => 拖動效果',
    '单词发光效果 => 單字發光效果',
    'Lyricify 全屏 => Lyricify 全螢幕',
].join(' ');

const translationTargets = [
    createDirectoryTarget({
        key: 'pages-zh-hant',
        sourceRoot: path.join(repoRoot, 'src', 'pages', 'zh-cn'),
        targetRoot: path.join(repoRoot, 'src', 'pages', 'zh-hant'),
        extensions: new Set(['.astro']),
        translationInstructions: [
            ...commonTranslationInstructions,
            'You convert Simplified Chinese Astro pages into natural Traditional Chinese for CI builds.',
            'Preserve Astro component syntax, JSX-like tags, JavaScript expressions, inline style objects, and CSS blocks exactly.',
            'Translate only user-facing Chinese text and string literals intended for UI copy.',
            terminologyGlossary,
        ].join(' '),
    }),
    createDirectoryTarget({
        key: 'docs-zh-hant',
        sourceRoot: path.join(repoRoot, 'src', 'content', 'docs', 'zh-cn'),
        targetRoot: path.join(repoRoot, 'src', 'content', 'docs', 'zh-hant'),
        extensions: new Set(['.md', '.mdx']),
        translationInstructions: [
            ...commonTranslationInstructions,
            'You convert Simplified Chinese Astro/Starlight documentation into natural Traditional Chinese for CI builds.',
            'Preserve frontmatter keys, admonition syntax, tables, JSX, markdown formatting, and import/export statements.',
            terminologyGlossary,
        ].join(' '),
    }),
    createSingleFileTarget({
        key: 'i18n-zh-hant',
        sourcePath: path.join(repoRoot, 'src', 'content', 'i18n', 'zh-CN.json'),
        basePath: path.join(
            repoRoot,
            'node_modules',
            '@astrojs',
            'starlight',
            'translations',
            'zh-TW.json',
        ),
        targetPath: path.join(repoRoot, 'src', 'content', 'i18n', 'zh-Hant.json'),
        translationInstructions: [
            ...commonTranslationInstructions,
            'You convert Simplified Chinese JSON translation values into natural Traditional Chinese for CI builds.',
            'Keep JSON keys unchanged and translate only string values.',
            terminologyGlossary,
        ].join(' '),
    }),
    createSingleFileTarget({
        key: 'data-zh-hant',
        sourcePath: path.join(repoRoot, 'src', 'data', 'Data.json'),
        targetPath: path.join(
            repoRoot,
            'src',
            'data',
            'generated',
            'zh-Hant',
            'Data.json',
        ),
        translationInstructions: [
            ...commonTranslationInstructions,
            'You convert Simplified Chinese JSON translation values into natural Traditional Chinese for CI builds.',
            'Keep JSON keys unchanged and translate only string values.',
            terminologyGlossary,
        ].join(' '),
    }),
    createSingleFileTarget({
        key: 'labels-zh-hant',
        sourcePath: path.join(repoRoot, 'src', 'data', 'Labels.json'),
        targetPath: path.join(
            repoRoot,
            'src',
            'data',
            'generated',
            'zh-Hant',
            'Labels.json',
        ),
        translationInstructions: [
            ...commonTranslationInstructions,
            'You convert Simplified Chinese JSON translation values into natural Traditional Chinese for CI builds.',
            'Keep JSON keys unchanged and translate only string values.',
            terminologyGlossary,
        ].join(' '),
    }),
    createSingleFileTarget({
        key: 'component-labels-zh-hant',
        sourcePath: path.join(repoRoot, 'src', 'data', 'ComponentLabels.json'),
        targetPath: path.join(
            repoRoot,
            'src',
            'data',
            'generated',
            'zh-Hant',
            'ComponentLabels.json',
        ),
        translationInstructions: [
            ...commonTranslationInstructions,
            'You convert Simplified Chinese JSON translation values into natural Traditional Chinese for CI builds.',
            'Keep JSON keys unchanged and translate only string values.',
            terminologyGlossary,
        ].join(' '),
    }),
    createSingleFileTarget({
        key: 'product-versions-zh-hant',
        sourcePath: path.join(repoRoot, 'src', 'data', 'ProductVersions.data.ts'),
        targetPath: path.join(
            repoRoot,
            'src',
            'data',
            'generated',
            'zh-Hant',
            'ProductVersions.data.ts',
        ),
        translationInstructions: [
            ...commonTranslationInstructions,
            'You convert Simplified Chinese TypeScript data files into natural Traditional Chinese for CI builds.',
            'Preserve TypeScript syntax, object keys, identifiers, URLs, and exported symbol names exactly.',
            'Translate only user-facing Chinese string literals.',
            terminologyGlossary,
        ].join(' '),
    }),
];

function createDirectoryTarget({
    key,
    sourceRoot,
    targetRoot,
    extensions,
    translationInstructions,
}) {
    return {
        type: 'directory',
        key,
        sourceRoot,
        targetRoot,
        extensions,
        translationInstructions,
    };
}

function createSingleFileTarget({
    key,
    sourcePath,
    basePath,
    targetPath,
    translationInstructions,
}) {
    return {
        type: 'file',
        key,
        sourcePath,
        basePath,
        targetPath,
        translationInstructions,
    };
}

async function pathExists(targetPath) {
    try {
        await fs.access(targetPath);
        return true;
    } catch {
        return false;
    }
}

async function ensureDir(targetPath) {
    await fs.mkdir(targetPath, {recursive: true});
}

async function readJson(targetPath, fallbackValue) {
    try {
        const content = await fs.readFile(targetPath, 'utf8');
        return JSON.parse(content);
    } catch {
        return fallbackValue;
    }
}

function toPosixPath(relativePath) {
    return relativePath.split(path.sep).join(path.posix.sep);
}

function sha256(value) {
    return createHash('sha256').update(value).digest('hex');
}

function buildSourceHash(target, content) {
    return sha256(
        `${promptVersion}\n${target.key}\n${model}\n${target.translationInstructions}\n${content}`
    );
}

async function* walkSourceFiles(currentDir, extensions) {
    const entries = await fs.readdir(currentDir, {withFileTypes: true});
    for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
            yield* walkSourceFiles(fullPath, extensions);
            continue;
        }
        if (!entry.isFile()) continue;
        if (!extensions.has(path.extname(entry.name).toLowerCase())) continue;
        yield fullPath;
    }
}

function extractTextPayload(responseJson) {
    const content = responseJson?.choices?.[0]?.message?.content;
    if (typeof content === 'string') return content.trim();
    if (Array.isArray(content)) {
        return content
            .filter((item) => item?.type === 'text' && typeof item.text === 'string')
            .map((item) => item.text)
            .join('\n')
            .trim();
    }
    return '';
}

function normalizeTranslatedContent(content, sourceContent) {
    let normalized = content.trim();
    if (normalized.startsWith('```') && normalized.endsWith('```')) {
        normalized = normalized
            .replace(/^```[a-zA-Z0-9_-]*\n?/, '')
            .replace(/\n?```$/, '');
    }
    if (sourceContent.endsWith('\n') && !normalized.endsWith('\n')) {
        normalized += '\n';
    }
    return normalized;
}

function stripCodeFence(content) {
    const trimmed = content.trim();
    if (!trimmed.startsWith('```') || !trimmed.endsWith('```')) return trimmed;
    return trimmed
        .replace(/^```[a-zA-Z0-9_-]*\n?/, '')
        .replace(/\n?```$/, '')
        .trim();
}

function extractMarkedContent(content) {
    const startMarker = '<<<TRANSLATED_CONTENT';
    const endMarker = '>>>END_TRANSLATED_CONTENT';
    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) return '';
    const afterStart = content.indexOf('\n', startIndex);
    if (afterStart === -1) return '';
    const endIndex = content.indexOf(endMarker, afterStart + 1);
    if (endIndex === -1) return '';
    return content.slice(afterStart + 1, endIndex).trim();
}

function parseTranslatedJson(textPayload) {
    const cleanedPayload = stripCodeFence(textPayload);
    const candidates = [cleanedPayload];
    const objectStart = cleanedPayload.indexOf('{');
    const objectEnd = cleanedPayload.lastIndexOf('}');
    if (objectStart !== -1 && objectEnd !== -1 && objectEnd > objectStart) {
        candidates.push(cleanedPayload.slice(objectStart, objectEnd + 1));
    }

    for (const candidate of candidates) {
        try {
            const parsed = JSON.parse(candidate);
            if (
                typeof parsed?.translated_content === 'string' &&
                parsed.translated_content.trim()
            ) {
                return parsed.translated_content;
            }
        } catch {}
    }

    return '';
}

function extractTranslatedContent(textPayload) {
    const markedContent = extractMarkedContent(textPayload);
    if (markedContent) return markedContent;

    const jsonContent = parseTranslatedJson(textPayload);
    if (jsonContent) return jsonContent;

    throw new Error(
        [
            'Invalid translation payload. Expected marked content or JSON object with "translated_content".',
            'Received payload preview:',
            textPayload.slice(0, 1000),
        ].join('\n')
    );
}

function splitFenceBlock(content) {
    const normalized = content.replace(/^\uFEFF/, '');
    const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/);
    if (!match) {
        return {
            block: null,
            body: normalized,
            newline: normalized.includes('\r\n') ? '\r\n' : '\n',
        };
    }

    return {
        block: match[1],
        body: normalized.slice(match[0].length),
        newline:
            match[2].includes('\r\n') || normalized.includes('\r\n')
                ? '\r\n'
                : '\n',
    };
}

function extractLeadingModuleStatements(content) {
    const match = content.match(
        /^((?:\s*(?:import|export)\s+.*(?:\r?\n|$))+)/,
    );
    return {
        block: match?.[1] ?? '',
        statements: match?.[1].match(/^\s*(?:import|export)\s+.*$/gm) ?? [],
        bodyWithoutBlock: match ? content.slice(match[1].length) : content,
    };
}

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractImportBindings(statement) {
    const match = statement
        .trim()
        .match(/^import\s+(.+?)\s+from\s+['"][^'"]+['"]\s*;?$/);
    if (!match) return [];

    const bindings = [];
    let clause = match[1].trim();

    if (!clause.startsWith('{') && !clause.startsWith('*')) {
        const defaultImportMatch = clause.match(
            /^([A-Za-z_$][\w$]*)(?:\s*,\s*([\s\S]+))?$/,
        );
        if (defaultImportMatch) {
            bindings.push(defaultImportMatch[1]);
            clause = defaultImportMatch[2]?.trim() ?? '';
        }
    }

    if (!clause) return bindings;

    if (clause.startsWith('{') && clause.endsWith('}')) {
        for (const part of clause.slice(1, -1).split(',')) {
            const trimmedPart = part.trim();
            if (!trimmedPart) continue;
            const aliasMatch = trimmedPart.match(
                /\bas\s+([A-Za-z_$][\w$]*)$/,
            );
            bindings.push(aliasMatch ? aliasMatch[1] : trimmedPart);
        }
        return bindings;
    }

    const namespaceMatch = clause.match(/^\*\s+as\s+([A-Za-z_$][\w$]*)$/);
    if (namespaceMatch) {
        bindings.push(namespaceMatch[1]);
    }

    return bindings;
}

function restoreBindingNames(sourceStatements, translatedStatements, content) {
    let nextContent = content;
    const statementCount = Math.min(
        sourceStatements.length,
        translatedStatements.length,
    );

    for (let index = 0; index < statementCount; index += 1) {
        const sourceBindings = extractImportBindings(sourceStatements[index]);
        const translatedBindings = extractImportBindings(
            translatedStatements[index],
        );
        if (
            sourceBindings.length === 0 ||
            sourceBindings.length !== translatedBindings.length
        ) {
            continue;
        }

        for (
            let bindingIndex = 0;
            bindingIndex < sourceBindings.length;
            bindingIndex += 1
        ) {
            const sourceBinding = sourceBindings[bindingIndex];
            const translatedBinding = translatedBindings[bindingIndex];
            if (sourceBinding === translatedBinding) continue;

            nextContent = nextContent.replace(
                new RegExp(
                    `(?<![\\w$])${escapeRegex(translatedBinding)}(?![\\w$])`,
                    'g',
                ),
                sourceBinding,
            );
        }
    }

    return nextContent;
}

function restoreMdxModuleStatements(relativePath, sourceContent, translatedContent) {
    if (path.extname(relativePath).toLowerCase() !== '.mdx') {
        return translatedContent;
    }

    const sourceParts = splitFenceBlock(sourceContent);
    const translatedParts = splitFenceBlock(translatedContent);
    const sourceModuleBlock = extractLeadingModuleStatements(sourceParts.body);
    const translatedModuleBlock = extractLeadingModuleStatements(
        translatedParts.body,
    );

    if (!sourceModuleBlock.block) return translatedContent;

    const restoredBody = `${sourceModuleBlock.block}${restoreBindingNames(
        sourceModuleBlock.statements,
        translatedModuleBlock.statements,
        translatedModuleBlock.bodyWithoutBlock,
    )}`;

    if (!translatedParts.block) {
        return restoredBody;
    }

    return `---${translatedParts.newline}${translatedParts.block}${translatedParts.newline}---${translatedParts.newline}${restoredBody}`;
}

function restoreAstroModuleStatements(relativePath, sourceContent, translatedContent) {
    if (path.extname(relativePath).toLowerCase() !== '.astro') {
        return translatedContent;
    }

    const sourceParts = splitFenceBlock(sourceContent);
    const translatedParts = splitFenceBlock(translatedContent);
    if (!sourceParts.block || !translatedParts.block) return translatedContent;

    const sourceModuleBlock = extractLeadingModuleStatements(sourceParts.block);
    const translatedModuleBlock = extractLeadingModuleStatements(
        translatedParts.block,
    );

    if (!sourceModuleBlock.block) return translatedContent;

    const restoredFrontmatterBody = restoreBindingNames(
        sourceModuleBlock.statements,
        translatedModuleBlock.statements,
        translatedModuleBlock.bodyWithoutBlock,
    );
    const restoredTemplateBody = restoreBindingNames(
        sourceModuleBlock.statements,
        translatedModuleBlock.statements,
        translatedParts.body,
    );
    const restoredFrontmatter = `${sourceModuleBlock.block}${restoredFrontmatterBody}`;

    return `---${translatedParts.newline}${restoredFrontmatter}${translatedParts.newline}---${translatedParts.newline}${restoredTemplateBody}`;
}

async function translateFile(target, relativePath, sourceContent) {
    if (!canUseApiTranslation) {
        throw new Error(
            [
                'Missing TRANSLATION_API_KEY or TRANSLATION_MODEL.',
                `Cannot translate ${relativePath}.`,
            ].join('\n'),
        );
    }

    const requestBody = {
        model,
        messages: [
            {
                role: 'system',
                content: target.translationInstructions,
            },
            {
                role: 'user',
                content: [
                    'Convert this source file from Simplified Chinese to Traditional Chinese.',
                    `Source file: ${relativePath}`,
                    'Return the translated file content between these exact markers:',
                    '<<<TRANSLATED_CONTENT',
                    '... translated file content here ...',
                    '>>>END_TRANSLATED_CONTENT',
                    'Do not output JSON unless you cannot follow the marker format.',
                    'Do not wrap the response in Markdown code fences.',
                    'Source content starts after the marker below.',
                    '<<<SOURCE_FILE',
                    sourceContent,
                ].join('\n'),
            },
        ],
        temperature: 0.2,
    };

    let lastError;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
        try {
            const response = await fetch(`${apiBaseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(
                    `Translation API returned ${response.status}: ${await response.text()}`,
                );
            }

            const responseJson = await response.json();
            const textPayload = extractTextPayload(responseJson);
            if (!textPayload) {
                throw new Error(
                    `Empty translation response for ${target.key}/${relativePath}`,
                );
            }

            return normalizeTranslatedContent(
                extractTranslatedContent(textPayload),
                sourceContent,
            );
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError;
}

async function writeFileEnsured(targetPath, content) {
    await ensureDir(path.dirname(targetPath));
    await fs.writeFile(targetPath, content, 'utf8');
}

function mergeJsonTranslations(baseContent, translatedCustomContent) {
    const baseTranslations = JSON.parse(baseContent);
    const customTranslations = JSON.parse(translatedCustomContent);

    return `${JSON.stringify(
        {
            ...baseTranslations,
            ...customTranslations,
        },
        null,
        4,
    )}\n`;
}

function rewriteLocalizedSitePaths(content) {
    return content.replace(
        /(^|[\s"'`()=])\/zh-cn\//gm,
        '$1/zh-hant/',
    );
}

function rewriteLocalizedDocsUrls(content) {
    return content.replace(
        /https:\/\/docs\.lyricify\.app\/(?!en\/|zh-hant\/)([^\s"'`)<>]*)/g,
        (_match, pathname) =>
            `https://docs.lyricify.app/zh-hant/${
                typeof pathname === 'string' ? pathname : ''
            }`.replace(/\/{2,}/g, '/').replace('https:/', 'https://'),
    );
}

function postProcessTraditionalChineseContent(targetKey, translatedContent) {
    if (!targetKey.endsWith('zh-hant')) {
        return translatedContent;
    }

    return rewriteLocalizedDocsUrls(rewriteLocalizedSitePaths(translatedContent));
}

async function copyFileEnsured(sourcePath, targetPath) {
    await ensureDir(path.dirname(targetPath));
    await fs.copyFile(sourcePath, targetPath);
}

async function resetGeneratedOutputs() {
    for (const target of translationTargets) {
        if (target.type === 'directory') {
            await fs.rm(target.targetRoot, {recursive: true, force: true});
        } else {
            await fs.rm(target.targetPath, {force: true});
        }
    }
}

async function main() {
    if (shouldSkipTranslations) {
        console.log(
            'Skipping Traditional Chinese generation because SKIP_CI_TRANSLATIONS is enabled.',
        );
        return;
    }

    await ensureDir(cacheFilesRoot);
    await resetGeneratedOutputs();

    const cachedManifest = await readJson(manifestPath, {
        version: 1,
        promptVersion,
        model,
        entries: {},
    });

    for (const target of translationTargets) {
        await ensureDir(path.join(cacheFilesRoot, target.key));
        if (target.type === 'directory') {
            await ensureDir(target.targetRoot);
        } else {
            await ensureDir(path.dirname(target.targetPath));
        }
    }

    const nextManifest = {
        version: 1,
        promptVersion,
        model,
        updatedAt: new Date().toISOString(),
        entries: {},
    };

    const summary = {
        cache_dir: toPosixPath(path.relative(repoRoot, cacheRoot)),
        model,
        prompt_version: promptVersion,
        targets: {},
    };

    const pendingTranslations = [];

    for (const target of translationTargets) {
        const targetSummary = {
            restored_from_cache: 0,
            translated: 0,
        };

        if (target.type === 'directory') {
            for await (const sourcePath of walkSourceFiles(
                target.sourceRoot,
                target.extensions,
            )) {
                const relativePath = toPosixPath(
                    path.relative(target.sourceRoot, sourcePath),
                );
                const sourceContent = await fs.readFile(sourcePath, 'utf8');
                const sourceHash = buildSourceHash(target, sourceContent);
                const cachePath = path.join(cacheFilesRoot, target.key, relativePath);
                const targetPath = path.join(target.targetRoot, relativePath);
                const manifestKey = `${target.key}/${relativePath}`;
                const cachedEntry = cachedManifest.entries?.[manifestKey];

                nextManifest.entries[manifestKey] = {
                    sourceHash,
                    targetPath: toPosixPath(path.relative(repoRoot, targetPath)),
                    cachePath: toPosixPath(path.relative(repoRoot, cachePath)),
                    updatedAt: cachedEntry?.updatedAt || nextManifest.updatedAt,
                };

                if (
                    cachedEntry?.sourceHash === sourceHash &&
                    (await pathExists(cachePath))
                ) {
                    await copyFileEnsured(cachePath, targetPath);
                    targetSummary.restored_from_cache += 1;
                    continue;
                }

                pendingTranslations.push({
                    target,
                    relativePath,
                    sourceContent,
                    targetPath,
                    cachePath,
                    manifestKey,
                });
            }
        } else {
            const relativePath = path.basename(target.targetPath);
            const sourceContent = await fs.readFile(target.sourcePath, 'utf8');
            const baseContent = target.basePath
                ? await fs.readFile(target.basePath, 'utf8')
                : '';
            const sourceHash = buildSourceHash(
                target,
                `${sourceContent}\n@@BASE@@\n${baseContent}`,
            );
            const cachePath = path.join(
                cacheFilesRoot,
                target.key,
                path.basename(target.targetPath),
            );
            const manifestKey = `${target.key}/${relativePath}`;
            const cachedEntry = cachedManifest.entries?.[manifestKey];

            nextManifest.entries[manifestKey] = {
                sourceHash,
                targetPath: toPosixPath(path.relative(repoRoot, target.targetPath)),
                cachePath: toPosixPath(path.relative(repoRoot, cachePath)),
                updatedAt: cachedEntry?.updatedAt || nextManifest.updatedAt,
            };

            if (
                cachedEntry?.sourceHash === sourceHash &&
                (await pathExists(cachePath))
            ) {
                await copyFileEnsured(cachePath, target.targetPath);
                targetSummary.restored_from_cache += 1;
            } else {
                pendingTranslations.push({
                    target,
                    relativePath,
                    sourceContent,
                    baseContent,
                    targetPath: target.targetPath,
                    cachePath,
                    manifestKey,
                });
            }
        }

        summary.targets[target.key] = targetSummary;
    }

    if (pendingTranslations.length > 0) {
        if (!canUseApiTranslation) {
            throw new Error(
                [
                    `Missing TRANSLATION_API_KEY or TRANSLATION_MODEL for ${pendingTranslations.length} file(s).`,
                    'Traditional Chinese generation is configured to run only through the translation API.',
                ].join('\n'),
            );
        }

        console.log(
            `Using translation API for ${pendingTranslations.length} file(s).`,
        );
    }

    for (const item of pendingTranslations) {
        let translatedContent = await translateFile(
            item.target,
            item.relativePath,
            item.sourceContent,
        );
        if (item.target.basePath) {
            translatedContent = mergeJsonTranslations(
                item.baseContent,
                translatedContent,
            );
        }
        translatedContent = postProcessTraditionalChineseContent(
            item.target.key,
            translatedContent,
        );
        translatedContent = restoreMdxModuleStatements(
            item.relativePath,
            item.sourceContent,
            translatedContent,
        );
        translatedContent = restoreAstroModuleStatements(
            item.relativePath,
            item.sourceContent,
            translatedContent,
        );

        await writeFileEnsured(item.cachePath, translatedContent);
        await writeFileEnsured(item.targetPath, translatedContent);
        nextManifest.entries[item.manifestKey].updatedAt =
            new Date().toISOString();
        summary.targets[item.target.key].translated += 1;
        console.log(`Translated ${item.target.key}/${item.relativePath}`);
    }

    await writeFileEnsured(
        manifestPath,
        `${JSON.stringify(nextManifest, null, 2)}\n`,
    );

    console.log('Translation summary:', JSON.stringify(summary));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
