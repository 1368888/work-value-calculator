// 全局变量用于跟踪页面加载状态
let isPageLoaded = false;

// 检查页面是否完全加载
function checkPageLoaded() {
    return document.readyState === 'complete' && 
           document.getElementById('calculatorForm') &&
           document.getElementById('result');
}

document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 确保页面完全加载
    if (!isPageLoaded) {
        alert('页面正在加载，请稍候...');
        return;
    }
    
    try {
        // 获取输入值并进行验证
        const salary = parseFloat(document.getElementById('salary').value);
        // iOS Safari 的数字输入处理
        const workHours = (parseFloat(document.getElementById('workHours').value) || 0) / 60;
        const commuteHours = (parseFloat(document.getElementById('commuteHours').value) || 0) / 60;
        const slackHours = (parseFloat(document.getElementById('slackHours').value) || 0) / 60;
        
        // 验证输入值
        if (isNaN(salary) || isNaN(workHours) || isNaN(commuteHours) || isNaN(slackHours)) {
            alert('请输入有效的数字');
            return;
        }
        
        if (salary <= 0 || workHours <= 0) {
            alert('日薪和工作时长必须大于0');
            return;
        }
        
        // 获取系数
        const educationCoef = parseFloat(document.getElementById('education').value);
        const workEnvCoef = parseFloat(document.getElementById('workEnvironment').value);
        const genderEnvCoef = parseFloat(document.getElementById('genderEnvironment').value);
        const colleagueEnvCoef = parseFloat(document.getElementById('colleagueEnvironment').value);
        
        // 计算综合环境系数
        const environmentCoef = workEnvCoef * genderEnvCoef * colleagueEnvCoef;
        
        // 计算工作性价比
        const workValue = (salary * environmentCoef) / (35 * (workHours + commuteHours - 0.5 * slackHours) * educationCoef);
        
        // 显示结果
        const resultElement = document.getElementById('result');
        if (!resultElement) {
            alert('页面加载异常，请刷新重试');
            return;
        }
        resultElement.classList.remove('hidden');
        const scoreElement = document.getElementById('score');
        const commentElement = document.getElementById('comment');
        
        // 确保结果是有效数字
        if (isFinite(workValue) && workValue > 0) {
            scoreElement.textContent = workValue.toFixed(2);
            
            // 根据性价比显示不同评价
            let comment = '';
            if (workValue > 2.0) {
                comment = '爽到爆！😆';
                commentElement.className = 'super-happy';
            } else if (workValue > 1.5) {
                comment = '很爽！😊';
                commentElement.className = 'happy';
            } else if (workValue < 0.8) {
                comment = '很惨...😢';
                commentElement.className = 'sad';
            } else {
                comment = '一般 😐';
                commentElement.className = 'normal';
            }
            commentElement.textContent = comment;
        } else {
            alert('计算结果无效，请检查输入值');
        }
    } catch (error) {
        // 错误处理
        console.error('计算错误:', error);
        alert('计算出错，请检查输入值是否正确');
    }
    
    // iOS Safari 兼容的平滑滚动
    try {
        const resultElement = document.getElementById('result');
        if (resultElement) {
            resultElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    } catch (e) {
        // 降级处理
        const resultElement = document.getElementById('result');
        if (resultElement) {
            window.scrollTo(0, resultElement.offsetTop);
        }
    }
});

// 添加输入验证
document.querySelectorAll('input[type="number"]').forEach(input => {
    // iOS Safari 输入优化
    input.setAttribute('inputmode', 'decimal');
    input.setAttribute('pattern', '[0-9]*');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('novalidate', 'true');
    
    input.addEventListener('input', function() {
        const value = parseFloat(this.value) || 0;
        if (value < 0) {
            this.value = 0;
        }
    });
});

// 确保页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化加载状态检查
    if (checkPageLoaded()) {
        isPageLoaded = true;
    } else {
        // 如果页面未完全加载，等待加载完成
        const loadCheckInterval = setInterval(() => {
            if (checkPageLoaded()) {
                isPageLoaded = true;
                clearInterval(loadCheckInterval);
            }
        }, 100);
    }

    // 隐藏结果区域
    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.classList.add('hidden');
    }
    
    // 设置输入框的默认值
    document.getElementById('salary').value = '';
    document.getElementById('workHours').value = '';
    document.getElementById('commuteHours').value = '';
    document.getElementById('slackHours').value = '';
    
    // iOS Safari 触摸优化
    document.addEventListener('touchstart', function() {}, false);
});

// 添加页面可见性变化监听
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 页面重新可见时检查加载状态
        isPageLoaded = checkPageLoaded();
    }
});
