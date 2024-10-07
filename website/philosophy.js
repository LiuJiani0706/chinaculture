document.addEventListener('DOMContentLoaded', function() {
    const pageKey = 'philosophy_comments'; // 每个页面独特的键
    
    
        // 初始化页面时从localStorage加载评论
        const commentArea = document.getElementById('comment-area');
        if (localStorage.getItem(pageKey)) {
            commentArea.innerHTML = localStorage.getItem(pageKey);
        }
    
        // 获取按钮和评论框
        const sendBtn = document.getElementById('send-btn');
        const commentBox = document.getElementById('comment-box');
        let userIP = '';
    
        // 获取用户的 IP 地址并显示为昵称
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                userIP = data.ip;
            })
            .catch(error => console.error('Error fetching IP:', error));
    
        // 监听发送按钮点击事件
        sendBtn.addEventListener('click', function() {
            const commentText = commentBox.value;
    
            if (commentText.trim() === "") return; // 防止空白评论
    
            // 创建评论内容
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <p class="comment-author">User: ${userIP}</p>
                <p>${commentText}</p>
                <button class="reply-btn">Reply</button>
                <div class="reply-input" style="display: none;">
                    <textarea rows="2" placeholder="Write your reply..."></textarea>
                    <button class="send-reply-btn">Send Reply</button>
                </div>
            `;
    
            commentArea.appendChild(commentDiv);
            commentBox.value = ''; // 清空输入框
    
            // 保存到localStorage
            localStorage.setItem(pageKey, commentArea.innerHTML);
        });
    
        // 使用事件委托监听回复按钮点击事件
        commentArea.addEventListener('click', function(event) {
            if (event.target.classList.contains('reply-btn')) {
                const replyInput = event.target.nextElementSibling;
                replyInput.style.display = 'block'; // 显示回复输入框
            } else if (event.target.classList.contains('send-reply-btn')) {
                const replyInput = event.target.closest('.reply-input');
                const replyText = replyInput.querySelector('textarea').value;
    
                if (replyText.trim() === "") return;
    
                // 创建回复内容
                const replyDiv = document.createElement('div');
                replyDiv.classList.add('comment');
                replyDiv.innerHTML = `<p class="comment-author">User: ${userIP}</p><p>${replyText}</p>`;
                replyInput.insertAdjacentElement('beforebegin', replyDiv);
    
                replyInput.style.display = 'none'; // 隐藏回复输入框
                replyInput.querySelector('textarea').value = ''; // 清空回复框
    
                // 保存更新后的评论区内容
                localStorage.setItem(pageKey, commentArea.innerHTML);
            }
        });
    });
    