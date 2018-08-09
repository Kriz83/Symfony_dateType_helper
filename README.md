# Symfony3 "dateType" helper

JS script to help with DateType field in Symfony3 when:
" 'widget' => 'text',   'format' => 'dd-MM-yyyy'; " 
are used to get 3 separate fields for day, month and year.

Example:
<br>
"<br>
->add('bornDate', DateType::class, array(<br>
     &#9;'attr' => array(<br>
           &#9;&#9;'class' => 'form-control',<br>
           &#9;&#9;'style' => 'color:black; width:250px; height:40px'<br>
      ),<br>
      'label' => 'Born date :',<br>
      'widget' => 'text',<br>
      'format' => 'dd-MM-yyyy',<br>
    )<br>
)<br>
"<br>

Script add a calendar functionality to faster date pick too.
