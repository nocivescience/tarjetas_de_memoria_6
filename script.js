const cardsContainer=document.getElementById('cards-container');
const prevBtn=document.getElementById('prev');
const nextBtn=document.getElementById('next');
const currentEl=document.getElementById('current');
const showEl=document.getElementById('show');
const clearEl=document.getElementById('clear');
const hideEl=document.getElementById('hide');
let questionEl=document.getElementById('question');
let answerEl=document.getElementById('answer');
const addContainer=document.getElementById('add-container')
const addCardBtn=document.getElementById('add-card');
const cardEl=[];
let currentActivateCard=0;
function createCard(data,index){
    const card=document.createElement('div');
    card.classList.add('card');
    if(index===0){
        card.classList.add('active')
    }
    card.innerHTML=`
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;
    card.addEventListener('click',()=>{
        card.classList.toggle('show-answer')
    });
    cardEl.push(card);
    cardsContainer.appendChild(card);
    updateCurrentText();
}
function updateCurrentText(){
    currentEl.innerHTML=`
        ${currentActivateCard+1}/${cardEl.length}
    `;
}
function getCardsData(){
    const cards=JSON.parse(localStorage.getItem('cards'))
    return cards===null?[]:cards;
}
function setCardsData(cards){
    localStorage.setItem('cards',JSON.stringify(cards));
    window.location.reload();
};
const cardsData=getCardsData();
function createCards(){
    cardsData.forEach((data,index)=>{
        createCard(data,index)
    })
}
createCards();
nextBtn.addEventListener('click',()=>{
    cardEl[currentActivateCard].classList.add('right');
    currentActivateCard++;
    if(currentActivateCard>cardEl.length-1){
        currentActivateCard=cardEl.length-1;
    }
    cardEl[currentActivateCard].className='card active';
    updateCurrentText();
})
prevBtn.addEventListener('click',()=>{
    cardEl[currentActivateCard].classList.add('left');
    currentActivateCard--;
    if(currentActivateCard<0){
        currentActivateCard=0
    };
    cardEl[currentActivateCard].className='card active';
    updateCurrentText();
})
showEl.addEventListener('click',()=>{
    addContainer.classList.add('show');
});
hideEl.addEventListener('click',()=>{
    addContainer.classList.remove('show');
});
addCardBtn.addEventListener('click',()=>{
    const question= questionEl.value;
    const answer=answerEl.value;
    if(question.trim()&&answer.trim()){
        const newCard={question,answer};
        createCard(newCard);
        questionEl='';
        answerEl='';
        addContainer.classList.remove('show');
        cardsData.push(newCard);
        setCardsData(cardsData)
    }
})
clearEl.addEventListener('click',()=>{
    localStorage.clear();
    cardsContainer.innerHTML='';
    window.location.reload();
})
console.log(cardEl)