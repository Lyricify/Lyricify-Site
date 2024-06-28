## 网站代码标准

由于~~逆天Prettier和各种奇奇怪怪的格式化工具~~某些问题和不爽现在对本网站的内容编写进行规范
请按照规范调整您的编辑器或格式化设置

### 全局

#### 强制换行长度

强制换行长度应为120字符

#### 换行

空行应始终保留，不管有多少

#### 缩进

1. 缩进应始终为4个空格（不论在哪种语言，`typescript`或`HTML`等等）
2. 空行的缩进不保留

### HTML / Astro HTML

#### 自闭合标签空格

自闭合标签的斜杠前不需要空格

请使用

```html
<slot/>
```

而非

```html
<slot />
```

#### 右尖括号位置

右尖括号在多行参数后应始终单独成行

使用

```html
<img src="/public/showcase/showcase1.png"
     alt="Showcase Picture"
/>
```

而非

```html
<img src="/public/showcase/showcase1.png"
     alt="Showcase Picture"/>
```

#### 多行参数缩进

多行参数的第一个应始终与标签同一行

使用

```html
<img src="/public/showcase/showcase1.png"
     alt="Showcase Picture"
/>
```

而非

```html
<img 
        src="/public/showcase/showcase1.png"
        alt="Showcase Picture"
/>
```

### TypeScript

TypeScript 必须使用 `strict` 模式

注意：TypeScript 缩进仍应使用4个空格而非2个

#### 空格

花括号周围内部不需要空格

使用

```typescript
export {MyComp1, MyComp2};
```

而非

```typescript
export { MyComp1, MyComp2 };
```

#### 分号

应尽量使用句末分号，不论其是不是导入语句

使用

```typescript
import {MyComp1, MyComp2} from 'Comps.astro';

console.log(MyComp1.label, MyComp2.label);
```

而非

```typescript
import {MyComp1, MyComp2} from 'Comps.astro'

console.log(MyComp1.label, MyComp2.label);
```

### Markdown

~~请直接禁用对 Markdown 的检查，谢谢！~~

#### Aside

使用

```markdown
:::tips
This is a tip.
:::
```

而非

```markdown
:::tips This is a tip :::
```

