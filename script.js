//
// فایل رفتار (JavaScript) برای پروژه To-Do List
// هدف: مدیریت افزودن/حذف آیتم‌ها و ذخیره‌سازی آن‌ها در localStorage
//
// نکته آموزشی:
// - localStorage فقط رشته (string) ذخیره می‌کند. پس برای آرایه/آبجکت‌ها از JSON.stringify و JSON.parse استفاده می‌کنیم.
// - همه چیز را در توابع کوچک و قابل فهم نگه می‌داریم.
// - رویدادها (event listeners) را در شروع برنامه وصل می‌کنیم.

(function () {
  "use strict";

  // کلید ذخیره‌سازی در localStorage — اگر تغییرش دهید، داده‌های قبلی دیگر خوانده نمی‌شوند
  const STORAGE_KEY = "todo.items.v1";

  // گرفتن ارجاع به عناصر DOM (رابط کاربری)
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const emptyState = document.getElementById("empty-state");
  const clearAllBtn = document.getElementById("clear-all-btn");

  // حالت (state) در حافظه — نماینده‌ی لیست کارها در جاوااسکریپت
  /** @type {{ id: string, text: string }[]} */
  let items = [];

  // --- توابع کمکی ذخیره‌سازی ---

  // خواندن از localStorage و بازگرداندن آرایه آیتم‌ها
  function loadItemsFromStorage() {
    // مقدار خام رشته‌ای را می‌گیریم
    const raw = localStorage.getItem(STORAGE_KEY);
    // اگر داده‌ای نبود، آرایه خالی برمی‌گردانیم
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      // اگر آرایه نبود، با آرایه خالی ایمن‌سازی می‌کنیم
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      // اگر JSON خراب بود، برای جلوگیری از خطا، خالی می‌کنیم
      console.warn("Failed to parse storage. Resetting.", err);
      return [];
    }
  }

  // ذخیره کردن آرایه آیتم‌ها در localStorage
  function saveItemsToStorage(itemsArray) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsArray));
  }

  // تولید یک شناسه یکتا ساده برای هر آیتم (برای حذف سریع)
  function generateId() {
    // روش ساده: زمان + یک عدد تصادفی کوتاه
    return `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  }

  // --- توابع ساخت UI ---

  // ساخت یک عنصر li برای آیتم و برگرداندن آن
  function createTodoListItemElement(item) {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = item.id; // ذخیره id در data-attribute برای حذف

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = item.text;

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.type = "button";
    delBtn.textContent = "حذف";
    delBtn.setAttribute("aria-label", `حذف ${item.text}`);
    delBtn.addEventListener("click", () => {
      removeItemById(item.id);
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    return li;
  }

  // رندر کامل لیست در UI بر اساس state
  function renderList() {
    // ابتدا محتوای لیست را خالی می‌کنیم
    list.innerHTML = "";

    // اگر لیست خالی بود، پیام خالی بودن را نمایش دهیم
    if (items.length === 0) {
      emptyState.style.display = "block";
      return;
    }
    // در غیر این صورت پیام خالی بودن را پنهان کنیم
    emptyState.style.display = "none";

    // برای هر آیتم عنصر li ساخته و اضافه می‌کنیم
    items.forEach((it) => {
      const li = createTodoListItemElement(it);
      list.appendChild(li);
    });
  }

  // --- توابع عملیات ---

  // افزودن آیتم جدید به state و ذخیره و رندر
  function addNewItem(text) {
    const trimmed = text.trim();
    if (trimmed.length === 0) return; // جلوگیری از اضافه کردن متن خالی

    const newItem = { id: generateId(), text: trimmed };
    items.push(newItem);
    saveItemsToStorage(items);
    renderList();
  }

  // حذف یک آیتم با استفاده از id آن
  function removeItemById(id) {
    items = items.filter((it) => it.id !== id);
    saveItemsToStorage(items);
    renderList();
  }

  // حذف همه آیتم‌ها (پاکسازی کامل)
  function clearAllItems() {
    const confirmed = confirm("همه آیتم‌ها حذف شوند؟");
    if (!confirmed) return;
    items = [];
    saveItemsToStorage(items);
    renderList();
  }

  // --- شروع برنامه (initialize) ---

  function init() {
    // 1) خواندن داده‌ها از localStorage
    items = loadItemsFromStorage();

    // 2) رندر اولیه بر اساس داده‌های موجود
    renderList();

    // 3) اتصال رویداد ارسال فرم برای افزودن آیتم جدید
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // جلوگیری از رفرش صفحه
      addNewItem(input.value);
      input.value = ""; // پاک کردن فیلد پس از افزودن
      input.focus(); // فوکوس مجدد برای سرعت بیشتر کاربر
    });

    // 4) رویداد حذف همه
    clearAllBtn.addEventListener("click", clearAllItems);
  }

  // اجرای init پس از لود شدن کامل DOM
  document.addEventListener("DOMContentLoaded", init);
})();
