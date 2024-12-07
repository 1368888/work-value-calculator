// 等待页面完全加载
window.addEventListener('load', function() {
    const form = document.getElementById('calculatorForm');
    const result = document.getElementById('result');
    
    // 隐藏结果区域
    if (result) {
        result.classList.add('hidden');
    }
    
    // 清空所有输入框
    ['salary', 'workHours', 'commuteHours', 'slackHours'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.value = '';
        }
    });
    
    // 表单提交处理
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});

// 处理表单提交
function handleSubmit(e) {
    e.preventDefault();
    
    try {
        // 获取所有输入值
        const inputs = {
            salary: getNumberValue('salary'),
            workHours: getNumberValue('workHours') / 60,
            commuteHours: getNumberValue('commuteHours') / 60,
            slackHours: getNumberValue('slackHours') / 60
        };
        
        // 基本验证
        if (inputs.salary <= 0 || inputs.workHours <= 0) {
            alert('请输入有效的日薪���工作时长');
            return;
        }
        
        // 获取所有系数
        const coefs = {
            education: getNumberValue('education'),
            workEnv: getNumberValue('workEnvironment'),
            gender: getNumberValue('genderEnvironment'),
            colleague: getNumberValue('colleagueEnvironment')
        };
        
        // 计算结果
        const environmentCoef = coefs.workEnv * coefs.gender * coefs.colleague;
        const workValue = (inputs.salary * environmentCoef) / 
                         (35 * (inputs.workHours + inputs.commuteHours - 0.5 * inputs.slackHours) * coefs.education);
        
        // 显示结果
        showResult(workValue);
        
    } catch (error) {
        alert('计算出错，请检查输入是否正确');
    }
}

// 获取数字值
function getNumberValue(id) {
    const element = document.getElementById(id);
    return element ? (parseFloat(element.value) || 0) : 0;
}

// 显示结果
function showResult(value) {
    const result = document.getElementById('result');
    const score = document.getElementById('score');
    const comment = document.getElementById('comment');
    
    if (!result || !score || !comment) {
        alert('页面元素加载异常，请刷新重试');
        return;
    }
    
    if (!isFinite(value) || value <= 0) {
        alert('计算结果无效，请检查输入值');
        return;
    }
    
    // 显示数值
    result.classList.remove('hidden');
    score.textContent = value.toFixed(2);
    
    // 设置评价
    let commentText = '';
    let className = '';
    
    if (value > 2.0) {
        commentText = '爽到爆！😆';
        className = 'super-happy';
    } else if (value > 1.5) {
        commentText = '很爽！😊';
        className = 'happy';
    } else if (value < 0.8) {
        commentText = '很惨...😢';
        className = 'sad';
    } else {
        commentText = '一般 😐';
        className = 'normal';
    }
    
    comment.textContent = commentText;
    comment.className = className;
    
    // 简单滚动到结果
    try {
        window.scrollTo(0, result.offsetTop);
    } catch (e) {
        // 忽略滚动错误
    }
}
