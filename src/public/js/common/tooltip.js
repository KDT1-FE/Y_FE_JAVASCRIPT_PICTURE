export function handleTooltipClick() {
  const tooltipContainer = document.querySelector('.members__contents')

  tooltipContainer.addEventListener('click', onClickTooltip)
}

function onClickTooltip(event) {
  const tooltip = event.target.closest('.tooltips')
  if (tooltip) {
    const ellipsisIcon = tooltip.querySelector('.fa-solid')

    if (ellipsisIcon) {
      tooltip.classList.toggle('clicked')
      ellipsisIcon.classList.toggle('fa-ellipsis')
      ellipsisIcon.classList.toggle('fa-ellipsis-vertical')
    }
  }
}
