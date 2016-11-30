module.exports = {
  function upVote(arg) {
    let $quality = arg.siblings('.quality-rating');
    let $downButton = arg.parent().children('.down-button');
    let $currentId = arg.parent().parent().attr('id');
    disableUpVoteButton(arg, $quality, $downButton, $currentId);
  }

  function disableUpVoteButton(arg, $quality, $downButton, $currentId) {
    if ($quality.text() === 'quality: swill') {
      $quality.text('quality: plausible');
      arg.prop('disabled', false);
      $downButton.prop('disabled', false);
      return updateTD($currentId, 'quality','quality: plausible');
    } else if ($quality.text() === 'quality: plausible') {
      $quality.text('quality: genius');
      arg.prop('disabled', true);
      $downButton.prop('disabled', false);
      return updateTD($currentId, 'quality','quality: genius');
    }
  }

  function downVote(arg) {
    let $quality = arg.siblings('.quality-rating');
    let $upButton = arg.parent().children('.up-button');
    let $currentId = arg.parent().parent().attr('id');
    disableDownVoteButton(arg, $quality, $downButton, $currentId);
  }

  disableDownVoteButton(arg, $quality, $downButton, $currentId) {
    if ($quality.text() === 'quality: genius') {
      $quality.text('quality: plausible');
      arg.prop('disabled', false);
      $upButton.prop('disabled', false);
      updateTD($currentId, 'quality', "quality: plausible");
    } else if ($quality.text() === 'quality: plausible') {
      $quality.text('quality: swill');
      arg.prop('disabled', true);
      $upButton.prop('disabled', false);
      updateTD($currentId, 'quality', "quality: swill");
    }
  }
}


// function upVote (quality) {
//   switch (quality) {
//     case 'swill':
//       return 'plausible';
//     case 'plausible':
//       return 'genius';
//     default:
//       return 'genius';
//   }
// }
//
// function downVote (quality) {
//   switch (quality) {
//     case 'genius':
//       return 'plausible';
//     case 'plausible':
//       return 'swill';
//     default:
//       return 'swill';
//   }
// }
