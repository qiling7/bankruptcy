
// 全局数据存储
let assessmentData = {
    part1: {},
    part2: {},
    part3: {}
};

/* ========== Part1 模拟清算 ========== */
function calculateLiquidation() {
    // 获取输入数据
    const inputs = {
        monetaryFunds: parseFloat(document.getElementById('monetaryFunds').value) || 0,
        externalInvestment: parseFloat(document.getElementById('externalInvestment').value) || 0,
        receivables: parseFloat(document.getElementById('receivables').value) || 0,
        fixedAssets: parseFloat(document.getElementById('fixedAssets').value) || 0,
        otherAssets: parseFloat(document.getElementById('otherAssets').value) || 0,
    };

    // 计算清算后可分配资金
    const distributableFunds = 
        inputs.monetaryFunds + 
        inputs.externalInvestment + 
        inputs.receivables + 
        inputs.fixedAssets + 
        inputs.otherAssets;

    // 渲染结果
    const resultDiv = document.getElementById('liquidation-result');
    resultDiv.innerHTML = `
        <div class="result-box">
            <h3>模拟清算结果</h3>
            <p>清算后可分配资金：${distributableFunds.toFixed(2)}万元</p>


        </div>
    `;

    // 数据持久化
    assessmentData.part1 = { 
        ...inputs, 
        distributableFunds,
    };
}

/* ========== Part2 评分系统 ========== */
function calculateRationality() {
    // 输入控制（带最大值限制）
    const inputs = {
        conversionFactor: parseFloat(document.getElementById('conversionFactor').value) || 1.5,
        
        // 核心合理性
        isShutdown: Math.min(parseFloat(document.getElementById('isShutdown').value) || 0, 5),
        salesOperation: Math.min(parseFloat(document.getElementById('salesOperation').value) || 0, 15),
        strategicInvestors: Math.min(parseFloat(document.getElementById('premiumpricing').value) || 0, 5),
        stableCashFlow: Math.min(parseFloat(document.getElementById('stableCashFlow').value) || 0, 15),
        hasTangibleAssets: Math.min(parseFloat(document.getElementById('hasTangibleAssets').value) || 0, 5),
        managementInPosition: Math.min(parseFloat(document.getElementById('managementInPosition').value) || 0, 3),
        internalRelations: Math.min(parseFloat(document.getElementById('internalRelations').value) || 0, 2),
        
        // 补充合理性
        customerRelations: Math.min(parseFloat(document.getElementById('customerRelations').value) || 0, 2),
        qualityCertification: Math.min(parseFloat(document.getElementById('qualityCertification').value) || 0, 5),
        industryLicense: Math.min(parseFloat(document.getElementById('industryLicense').value) || 0, 5),
        patents: Math.min(parseFloat(document.getElementById('patents').value) || 0, 5),
        softwareCopyrights: Math.min(parseFloat(document.getElementById('softwareCopyrights').value) || 0, 5),
        industryProspects: Math.min(parseFloat(document.getElementById('industryProspects').value) || 0, 2),
        digitalTransformation: Math.min(parseFloat(document.getElementById('digitalTransformation').value) || 0, 1),
        industryStatus: Math.min(parseFloat(document.getElementById('industryStatus').value) || 0, 2),
        socialValue: Math.min(parseFloat(document.getElementById('socialValue').value) || 0, 3),
        
        // 可行性
        govSupport: Math.min(parseFloat(document.getElementById('govSupport').value) || 0, 5),
        investorInterest: Math.min(parseFloat(document.getElementById('investorInterest').value) || 0, 5),
        specialQualification: Math.min(parseFloat(document.getElementById('specialQualification').value) || 0, 5),
        managementStability: Math.min(parseFloat(document.getElementById('managementStability').value) || 0, 5)
    };

    // 权重计算
    const coreTotal = (
        inputs.isShutdown + 
        inputs.salesOperation + 
        inputs.strategicInvestors + 
        inputs.stableCashFlow + 
        inputs.hasTangibleAssets + 
        inputs.managementInPosition + 
        inputs.internalRelations
    ) ;

    const suppTotal = (
        inputs.customerRelations + 
        inputs.qualityCertification + 
        inputs.industryLicense + 
        inputs.patents + 
        inputs.softwareCopyrights + 
        inputs.industryProspects + 
        inputs.digitalTransformation + 
        inputs.industryStatus + 
        inputs.socialValue
    ) ;

    const feasibility = (
        inputs.govSupport + 
        inputs.investorInterest + 
        inputs.specialQualification + 
        inputs.managementStability
    ) ;

    const totalScore = coreTotal + suppTotal + feasibility;

    // 重整价值计算
    const liquidationFunds = assessmentData.part1.distributableFunds || 0;
    const reorganizationValue = liquidationFunds * (totalScore / 100) * inputs.conversionFactor;


    // 结果渲染
    document.getElementById('rationality-result').innerHTML = `
        <div class="result-box">
            <h3>重整价值评估</h3>
            <p>核心合理性得分：${coreTotal.toFixed(1)}/50</p>
            <p>补充合理性得分：${suppTotal.toFixed(1)}/30</p>
            <p>可行性得分：${feasibility.toFixed(1)}/20</p>
            <p class="highlight">综合得分：${totalScore.toFixed(1)}/100</p>
            <p>转换系数：${inputs.conversionFactor}x → 重整价值：<strong>${reorganizationValue.toFixed(2)}万元</strong></p>
        </div>
    `;

    // 数据存储
    assessmentData.part2 = {
        ...inputs,
        coreTotal,
        suppTotal,
        feasibility,
        totalScore,
        reorganizationValue,
    };
}



/* ========== Part3 综合报告 ========== */
function calculateComprehensive() {
    // 从存储数据获取基础值
    const liquidationData = assessmentData.part1 || {};
    const reorganizationData = assessmentData.part2 || {};

    // 核心计算参数
    const distributableFunds = liquidationData.distributableFunds || 0;
    const totalScore = reorganizationData.totalScore || 0;
    const conversionFactor = reorganizationData.conversionFactor || 1.5;

    // 计算重整价值
    const estimatedValue = distributableFunds * (totalScore / 100) * conversionFactor;
    

    // 验证逻辑
    const isValid = estimatedValue > distributableFunds;

    // 渲染结果
    const resultDiv = document.getElementById('comprehensive-result');
    resultDiv.innerHTML = `
        <div class="result-box">
            <h3>综合重整验证</h3>
            <p>预估重整可分配资金：<strong>${estimatedValue.toFixed(2)}</strong>万元</p>
            <p>清算后可分配资金：<strong>${distributableFunds.toFixed(2)}</strong>万元</p>
            <p class="${isValid ? 'pass' : 'fail'}">结论：
                ${isValid ? 
                    '✅ 您的企业可能存在重整价值。' : 
                    '❌ 您企业的重整价值可能尚不足。'}
            </p>
        </div>
    `;

    // 数据持久化
    assessmentData.part3 = {
        estimatedValue,
        conversionFactor,
        isValid
    };
}
// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    createScoringInputs();
});