# A Basic To‑Do List (HTML/CSS/JS + localStorage)

این پروژه‌ی ساده برای آموزش HTML/CSS/JS و ذخیره‌سازی داده در مرورگر با `localStorage` طراحی شده است. تمام فایل‌ها همراه با کامنت‌های قدم‌به‌قدم هستند.

---

## اجرا (Run)
- اگر از Laragon استفاده می‌کنید، این پوشه را در `C:/laragon/www/todo-list` قرار دهید و آدرس `http://localhost/todo-list` را باز کنید.
- یا روی `index.html` دوبار کلیک کنید تا مستقیم در مرورگر باز شود.

---

## فایل‌ها (Files)
- `index.html`: ساختار UI و عناصر صفحه
- `style.css`: استایل و ظاهر مینیمال
- `script.js`: منطق افزودن/حذف و ذخیره‌سازی در `localStorage`

---

## راهنمای قدم‌به‌قدم برای ویدیو (Step‑by‑Step)

1) HTML
- یک `<form>` با یک `<input>` و یک دکمه «افزودن» بسازید.
- یک `<ul>` برای نمایش آیتم‌ها و یک دکمه «حذف همه» اضافه کنید.

2) CSS
- پس‌زمینه تیره، کارت مرکزی، و دکمه‌ها را استایل دهید.
- کلاس‌های کلیدی: `.container`, `.todo-list`, `.todo-item`, `.delete-btn`.

3) JavaScript
- المان‌ها را با `document.getElementById` بگیرید.
- state را به صورت آرایه `items` نگه دارید: `{ id, text }`.
- توابع اصلی:
  - `loadItemsFromStorage()`, `saveItemsToStorage()`
  - `generateId()`
  - `createTodoListItemElement(item)`
  - `renderList()`
  - عملیات: `addNewItem(text)`, `removeItemById(id)`, `clearAllItems()`
- در `init()` داده‌ها را بارگذاری کنید، رندر کنید و event listener ها را وصل کنید.

4) تست
- آیتم اضافه کنید، حذف تکی و «حذف همه» را امتحان کنید.
- صفحه را رفرش کنید؛ آیتم‌ها باید باقی بمانند (به لطف `localStorage`).

---

## نکات آموزشی (Notes)
- `localStorage` فقط string ذخیره می‌کند؛ از `JSON.stringify/parse` استفاده کنید.
- با id یکتا حذف امن انجام دهید.
- از `aria-*` برای بهبود دسترس‌پذیری استفاده شده است.

---

## ایده‌های بعدی (Extensions)
- ویرایش آیتم‌ها، تیک انجام شده، فیلترها (همه/انجام شده/انجام نشده)
- Drag & Drop برای مرتب‌سازی، همگام‌سازی با سرور

موفق باشید! 🎉
