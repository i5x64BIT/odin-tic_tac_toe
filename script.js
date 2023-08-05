const game = function(){
    let board = [];
    //Get User Choice
    const controlButtons = document.querySelectorAll('.controls button')
    controlButtons.forEach(b => {
        b.addEventListener('click', () => {
            const prevSelection = document.querySelector('selected');
            if(prevSelection) prevSelection.classList.toggle('selected')
            b.classList.toggle('selected')
        });
    })

    //Get User Board Input
    const boardElements = document.querySelectorAll('.board > div');
    boardElements.forEach((b) => {
        b.addEventListener('click', () => {
            const btnActive = document.querySelector(':checked + label');
            if(!btnActive) {
                alert('Please Select a Sign First!');
                return;
            }
            const { location } = b.dataset;
            const { choice } = btnActive.dataset
            
            if(choice == 'x') b.innerText = 'x';
            else b.innerText = 'o'
        });
    });


}();