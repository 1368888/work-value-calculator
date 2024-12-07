document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取输入值
    const salary = parseFloat(document.getElementById('salary').value);
    const workHours = parseFloat(document.getElementById('workHours').value) / 60;
    const commuteHours = parseFloat(document.getElementById('commuteHours').value) / 60;
    const slackHours = parseFloat(document.getElementById('slackHours').value) / 60;
    
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
    document.getElementById('result').classList.remove('hidden');
    const scoreElement = document.getElementById('score');
    const commentElement = document.getElementById('comment');
    
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
}); 