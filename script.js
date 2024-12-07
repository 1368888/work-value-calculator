// 全局变量用于跟踪页面加载状态
let isPageLoaded = false;

// 检查页面是否完全加载
function checkPageLoaded() {
    return document.readyState === 'complete';
}

document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    try {
        // 获取输入值并进行验证
        const salary = parseFloat(document.getElementById('salary').value) || 0;
        const workHours = (parseFloat(document.getElementById('workHours').value) || 0) / 60;
        const commuteHours = (parseFloat(document.getElementById('commuteHours').value) || 0) / 60;
        const slackHours = (parseFloat(document.getElementById('slackHours').value) || 0) / 60;
        
        // 验证输入值
        if (salary <= 0 || workHours <= 0) {
            alert('请输入有效的数字');
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
        
        // 简单的滚动
        window.scrollTo(0, resultElement.offsetTop);  
        
    } catch (error) {
        alert('计算出错，��检查输入值是否正确');
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 隐藏结果区域
    document.getElementById('result').classList.add('hidden');
    
    // 清空输入框
    document.getElementById('salary').value = '';
    document.getElementById('workHours').value = '';
    document.getElementById('commuteHours').value = '';
    document.getElementById('slackHours').value = '';
});
