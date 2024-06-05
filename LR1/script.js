window.onload = function(){ 

        
    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    


    function onDigitButtonClicked(digit) {
        
          input = document.getElementById('result');
          if (input.innerHTML.length > 15){
            document.getElementById('result').style.fontSize = '16px';
          }
          if (input.innerHTML.length > 27){
            document.getElementById('result').style.fontSize = '12px';
          }
            if (input.innerHTML.length <= 15){
            document.getElementById('result').style.fontSize = '24px';
          }
        
        if (!selectedOperation) {
            if (a === '0' ) {
                a = digit;
            } else if (a !== '0') {
                a += digit;
                
            }
            outputElement.innerHTML = a;
        } else {
            if ((digit !== '.') || (b !== '0' && b !== '')) {
                b += digit;
                outputElement.innerHTML = b;        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    function sqrt(n) {
        return (n ** 0.5);
      }
      


    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    document.getElementById("btn_sqrt").onclick = function() { 
        if (a === '') return
        selectedOperation = '√x'
        expressionResult = sqrt(+a)
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            // case '!':
            //     expressionResult=square(+a)
            //     break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }
    };
